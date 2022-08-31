import { ChatRoom } from "./models/ChatRoom";
import { Chatter } from "./models/Chatter";

$(function () {
    //Chatroom Client Code

    //1. Username angeben
    //2. anmelden
    //3. - Raum Auswahl
    //   - Raum Erstellung
    //4. Chat Fenster
});

openRooms = ChatRoom[{}];

login(function (username) {

});

enterRoom(function (roomId, username) {
    let toEnter;

    if (!this.existsRoom(roomId)) {
        toEnter = this.createRoom();
    }

    if (toEnter.containsInRoom(username)) {
        return;
    }

    toEnter.addToRoom(new Chatter(username));
    //todo: chat anzeigen? 
});

createRoom(function () {
    return new ChatRoom(Utils.generateRoomId());
});

existsRoom(function (roomId) {
    for (let room of openRooms) {
        if (room.getRoomId() === roomId) {
            return true;
        }
    }
    return false;
});





