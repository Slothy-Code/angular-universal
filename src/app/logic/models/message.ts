import {User} from '@logic/models/user';

export interface Message {
    sender: User;
    text: string;
    sendAt: number;
}