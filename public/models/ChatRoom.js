import { Chatter } from "./Chatter";

export class ChatRoom {

    roomId = "";
    chatters = Chatter[{}];

    constructor(roomId) {
        this.roomId = roomId;
    }

    addToRoom(chatter) {
        if (this.containsInRoom(chatter.getUserName())) {
            return;
        }

        this.chatters.push(chatter);
    }

    removeFromRoom(chatter) {
        if (!this.containsInRoom(chatter.getUserName())) {
            return;
        }

        this.chatters.flush(chatter);
    }

    containsInRoom(username) {
        for (let chatter of chatters) {
            if (room.getUserName() === username) {
                return true;
            }
        }
        return false;
    }

    getRoomId() {
        return this.roomId;
    }

}