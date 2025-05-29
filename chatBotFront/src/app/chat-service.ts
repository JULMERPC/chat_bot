import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = 'http://localhost:8080/api/chat'; // tu endpoint backend

  constructor(private http: HttpClient) {}

  enviarMensaje(mensaje: string): Observable<string> {
    const body = { mensaje };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    // @ts-ignore
    return this.http.post(this.apiUrl, body, {
      headers: {
        'Content-Type': 'application/json'
      },
      responseType: 'text' as 'json' // sigue siendo texto plano
    });
  }
}
