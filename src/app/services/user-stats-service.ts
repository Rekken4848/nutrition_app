import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserStats } from '../models/user-stats.model';

@Injectable({
  providedIn: 'root'
})
export class UserStatsService {

  private apiUrl = 'http://localhost:8080/userstats';

  constructor(private http: HttpClient) { }

  getUsersStats(): Observable<UserStats[]> {
    return this.http.get<UserStats[]>(`${this.apiUrl}`);
  }

  getUserStatsById(id: number): Observable<UserStats> {
    return this.http.get<UserStats>(`${this.apiUrl}/${id}`);
  }

  createUserStats(userStats: UserStats): Observable<UserStats> {
    const token = localStorage.getItem('authToken');
    console.log('En el createUserStats token:', token);
    return this.http.post<UserStats>(`${this.apiUrl}`, userStats);
  }

  updateUserStats(id: number, userStats: UserStats): Observable<UserStats> {
    return this.http.put<UserStats>(`${this.apiUrl}/${id}`, userStats);
  }

  deleteUserStats(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
