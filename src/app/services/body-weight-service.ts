import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BodyWeight } from '../models/body-weight.model';

@Injectable({
  providedIn: 'root'
})
export class BodyWeightService {

  private apiUrl = 'http://localhost:8080/bodyweight';

  constructor(private http: HttpClient) { }

  getBodyWeights(): Observable<BodyWeight[]> {
    return this.http.get<BodyWeight[]>(`${this.apiUrl}`);
  }

  getBodyWeightById(id: number): Observable<BodyWeight> {
    return this.http.get<BodyWeight>(`${this.apiUrl}/${id}`);
  }
  getLatestBodyWeight(): Observable<BodyWeight> {
    return this.http.get<BodyWeight>(`${this.apiUrl}/latest`);
  }

  createBodyWeight(bodyWeight: BodyWeight): Observable<BodyWeight> {
    return this.http.post<BodyWeight>(`${this.apiUrl}`, bodyWeight);
  }

  updateBodyWeight(id: number, bodyWeight: BodyWeight): Observable<BodyWeight> {
    return this.http.put<BodyWeight>(`${this.apiUrl}/${id}`, bodyWeight);
  }

  deleteBodyWeight(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
