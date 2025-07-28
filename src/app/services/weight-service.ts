import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Weight } from '../models/weight.model';

@Injectable({
  providedIn: 'root'
})
export class WeightService {

  private apiUrl = 'http://localhost:8080/weight';

  constructor(private http: HttpClient) { }

  getWeights(): Observable<Weight[]> {
    return this.http.get<Weight[]>(`${this.apiUrl}`);
  }

  getWeightById(id: number): Observable<Weight> {
    return this.http.get<Weight>(`${this.apiUrl}/${id}`);
  }
  getLatestWeight(): Observable<Weight> {
    return this.http.get<Weight>(`${this.apiUrl}/latest`);
  }

  createWeight(weight: Weight): Observable<Weight> {
    return this.http.post<Weight>(`${this.apiUrl}`, weight);
  }

  updateWeight(id: number, weight: Weight): Observable<Weight> {
    return this.http.put<Weight>(`${this.apiUrl}/${id}`, weight);
  }

  deleteWeight(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
