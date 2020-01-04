import { Component, HostListener, OnDestroy } from '@angular/core';
import { ChatService } from '../chat.service';
import * as moment from 'moment';
export interface message {
  outchat: boolean;
  value: string;
  username: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'angular-chat';
  message;
  messages: message[] = [];
  username: string;
  checked: boolean= true;
  data;
  loginchat: boolean;
  sokhach: boolean;
  login2;

  constructor(private chatService: ChatService){
  }
  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }
  ngOnInit() {
    this.chatService
    .getMessages()
    .subscribe((message) => {
      let currentTime = moment().format('hh:mm:ss a');
      let messageWithTimestamp =  `${currentTime}: ${message}`;
      console.log(message.username);
      
     // console.log(messageWithTimestamp);
      var result = message.username;
      var info = message.message;
     
      if(result!==''){
        this.checked =false;
      }
     
      this.messages.push({value: '(' + currentTime +') - '+ result +' : ' + info, outchat: true, username: message.username});
    });
this.chatService.getdisconnect().subscribe((data)=>{
var name = Object.values(data)[0];
var info = Object.values(data)[1];
var login = Object.values(data)[2];
if(!login){
  for (var i in this.messages) {
    if (this.messages[i].username == name) {
      this.messages[i].outchat = false;
       break; //Stop this loop, we found it!
    }
  }
}



});
this.chatService.getlogin().subscribe((data)=>{
  console.log(data);
  var name = Object.values(data)[0];
      var info = Object.values(data)[1];
      var login = Object.values(data)[2];
      console.log(name);
      console.log(info);
      console.log(login);
      if(login){
        this.loginchat=true;
      }{
        this.loginchat=false;
      }
      if(info>0){
        this.sokhach = true;
      }else{
        this.sokhach = false;
      }
      this.data = info;

      this.login2 =login;
      

  });
  
  }
  sendUsername(){
this.chatService.sendUsername(this.username);
this.username = '';
this.checked = false;
  }
 
ngOnDestroy() { 
  alert('window closed');
  this.chatService.sendUserleft(this.username+'left');
 }

}
