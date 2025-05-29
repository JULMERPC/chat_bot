import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {ChatService} from './chat-service';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'chatBotFront';

  mensaje = '';
  respuesta:any;

  constructor(private chatService: ChatService) {
  }

  enviar() {
    this.chatService.enviarMensaje(this.mensaje).subscribe((res: any) => {
      try {
        const json = JSON.parse(res);
        const content = json.choices?.[0]?.message?.content || 'Sin respuesta válida';
        this.respuesta = content;
      } catch (e) {
        console.error('Error al parsear JSON:', e);
        this.respuesta = 'Error al interpretar la respuesta del servidor.';
      }
    });
  }
}
