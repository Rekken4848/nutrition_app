import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Food } from '../models/food.model';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  private apiUrl = 'http://localhost:8080/food';

  constructor(private http: HttpClient) { }

  getFoods(): Observable<Food[]> {
    return this.http.get<Food[]>(`${this.apiUrl}`);
  }

  getFoodById(id: number): Observable<Food> {
    return this.http.get<Food>(`${this.apiUrl}/${id}`);
  }

  getFoodByUser(email: string): Observable<Food[]> {
    return this.http.get<Food[]>(`${this.apiUrl}/myfoods/${email}`);
  }

  createFood(email: string, food: Food): Observable<Food> {
    return this.http.post<Food>(`${this.apiUrl}/${email}`, food);
  }

  updateFood(id: number, email: string, food: Food): Observable<Food> {
    return this.http.put<Food>(`${this.apiUrl}/${id}/${email}`, food);
  }

  deleteFood(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getFoodByCode(code: string): Observable<Food> {
    return this.http.get<Food>(`${this.apiUrl}/code/${code}`);
  }
}
