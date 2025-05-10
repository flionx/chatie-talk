import type { IChatMessage, TMessageAuthor } from "../types/chat";

export class Message implements IChatMessage {
    id: string;
    type: TMessageAuthor;
    message: string;

    constructor(type: TMessageAuthor, message: string) {
        this.id = Date.now().toString();
        this.message = message;
        this.type = type;
    }

}