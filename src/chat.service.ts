import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

export class ChatService {
    private url = 'http://localhost:3000';
    private socket; 
     FADE_TIME = 150; // ms
     TYPING_TIMER_LENGTH = 400; // ms
     COLORS = [
      '#e21400', '#91580f', '#f8a700', '#f78b00',
      '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
      '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
    ];
  
    // Initialize variables
    // The chatroom page
  
    // Prompt for setting a username
     username;
     userleft;
     connected = false;
     typing = false;
     lastTypingTime;
    
    constructor() {
        this.socket = io(this.url);
    }
    public sendMessage(message) {
        this.socket.emit('new message', message);
    }
    public getMessages = () => {
        return Observable.create((observer) => {
            this.socket.on('new message', (message) => {
                observer.next(message);
            });
        });
    }
    public sendUsername(username) {
        this.socket.emit('add user', username);
    }
    public sendUserleft(userleft) {
        this.socket.emit('disconnect', userleft);
    }
    public getdisconnect = () => {
        return Observable.create((observer) => {
            this.socket.on('user left', (data) => {
                observer.next(data);
            });
        });
    }
    public getlogin = () => {
        return Observable.create((observer) => {
            this.socket.on('user joined', (data) => {
                observer.next(data);
            });
        });
    }

}