import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:3000/api/chatbot'; // Cambia según tu backend

  constructor(private http: HttpClient) {}

  enviarMensaje(mensaje: string): Observable<any> {
    return this.http.post(this.apiUrl, { message: mensaje });
  }

  enviarIntento(intent: string): Observable<any> {
    return this.http.post(this.apiUrl, { intent: intent });
  }
}
