import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Openai {
  private readonly apiUrl = 'https://api.openai.com/v1/chat/completions';
  private readonly apiKey = environment.openAiApiKey;
  constructor(private http: HttpClient) {}

  async getChatCompletion(messages: { role: 'user' | 'assistant' | 'system'; content: string }[]) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`
    });

    const body = {
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.5
    };

    const response = await firstValueFrom(this.http.post<any>(this.apiUrl, body, { headers }));
    return response.choices[0].message.content.trim();
  }
}
