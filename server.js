var express = require('express');
var app = express();

var server = require('http').createServer(app);

var io = require('socket.io')(server);

var port = process.env.PORT || 3000;
server.listen(port, function () {
    console.log('Webserver gestartet auf Port %d', port);
});

app.use(express.static(__dirname + '/public'));

var rooms = {};

io.on('connection', function (socket) {
    var user = {
        connected: false
    };

    socket.once('login', function (data) {
        console.log('User login: ', data.name);
        user.name = data.name;
        user.connected = true;

        socket.emit('rooms', rooms);

        socket.once('disconnect', function () {
            if(user.room) {
                sendToRoom(`User ${user.name} hat die Verbindung geschlossen.`);
            }
        });
    });

    socket.on('connect to room', function (roomName) {
        if(!rooms.hasOwnProperty(roomName)) {
            socket.emit('error', {msg: 'Dieser Raum existiert noch nicht. Tippfehler?'});
            return;
        }
        joinRoom(room);
    });

    socket.on('leave room', function() {
        leaveRoom();
    });

    socket.on('create room', function (roomName) {
        roomName = roomName.trim();
        if (rooms.hasOwnProperty(roomName)) {
            socket.emit('error', { msg: 'Dieser Raum existiert bereits.' });
        }
        else {
            rooms[roomName];
        }

        joinRoom(roomName);

        sendToRoom(`User ${user.name} ist dem Raum beigetreten`);
    });

    socket.on('message', function (data) {
        if (!user.room) {
            return;
        }

        sendToRoom(data.msg);
    });



    function createRoom(roomName) {
        rooms[roomName] = 0;
    }

    function joinRoom(roomName) {
        leaveRoom();
        socket.join(roomName);
        socket.roomName;
        user.room = roomName;
        if(!rooms.hasOwnProperty(roomName)) {
            createRoom(roomName);
        }
    }
    
    function leaveRoom() {
        if (user.room) {
            socket.leave(user.room);
            sendToRoom(`User ${user.name} hat den Raum verlassen.`);
            
            rooms[user.room] -= 1;
            
            if(rooms[user.room] <= 0) {
                delete rooms[user.room];
            }
            delete user.room;
        }
    }

    function sendToRoom(msg) {
        io.to(user.room).broadcast.send({
            msg: msg,
            user: user.name
        });
    }

});
