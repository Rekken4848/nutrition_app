import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserStats } from '../models/user-stats.model';
import { UserWithStatsDto } from '../models/user-with-stats-dto.model';

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

  getUserAndStatsByEmail(email: string): Observable<UserWithStatsDto> {
    return this.http.get<UserWithStatsDto>(`${this.apiUrl}/user/${email}`);
  }

  createUserStats(user_id: number, userStats: UserStats): Observable<UserStats> {
    return this.http.post<UserStats>(`${this.apiUrl}/${user_id}`, userStats);
  }

  updateUserStats(id: number, user_id: number, userStats: UserStats): Observable<UserStats> {
    return this.http.put<UserStats>(`${this.apiUrl}/${id}/${user_id}`, userStats);
  }

  uploadUserStatsWithAvatar(user_id: number, userStats: UserStats, file: File): Observable<UserStats> {
    const formData = new FormData();

    formData.append('image', file);

    formData.append(
      'userStats',
      new Blob([JSON.stringify(userStats)], { type: 'application/json' })
    );

    return this.http.put<UserStats>(`${this.apiUrl}/upload-avatar/${user_id}`, formData);
  }

  updateUserAndStats(dto: UserWithStatsDto): Observable<any> {
    return this.http.put(`${this.apiUrl}/user`, dto);
  }

  deleteUserStats(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
