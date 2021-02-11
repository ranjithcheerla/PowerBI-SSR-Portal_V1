import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: any[] = [];

  add(message: any) {
    this.messages.push(message);
  }

  getMessages() {
    const messages = this.messages;
    this.clear();
    return messages;
  }

  clear() {
    this.messages = [];
  }
}
