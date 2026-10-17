import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface Message {
  from: 'user' | 'bot';
  text: string;
}

@Component({
  selector: 'app-chatbot',
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.css',
})
export class Chatbot {
  private http = inject(HttpClient);

  messages = signal<Message[]>([
    { from: 'bot', text: 'Hi! I can help with your tasks.' },
  ]);

  userText = '';

  send() {
    //text is "", so if (!text) return; stops the function.
    //The post line is never reached, so no empty request goes to the server.
    const text = this.userText.trim();
    if (!text) return;

    this.messages.update(list =>[...list ,{from: 'user', text:text }])
    this.userText = '';

    this.http
      .post<{ reply: string }>('http://localhost:3000/chat', { message: text })
      .subscribe({
        next: res =>
          this.messages.update(list => [...list, { from: 'bot', text: res.reply }]),
        error: () =>
          this.messages.update(list => [
            ...list,
            { from: 'bot', text: 'Sorry, something went wrong.' },
          ]),
      });
  }
}
