import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersRecipes } from '../models/users-recipes.model';

@Injectable({
  providedIn: 'root'
})
export class UsersRecipesService {

  private apiUrl = 'http://localhost:8080/usersrecipes';

  constructor(private http: HttpClient) { }

  getAllUsersRecipes(): Observable<UsersRecipes[]> {
    return this.http.get<UsersRecipes[]>(`${this.apiUrl}`);
  }

  getUsersRecipesById(id: number): Observable<UsersRecipes> {
    return this.http.get<UsersRecipes>(`${this.apiUrl}/${id}`);
  }

  createUsersRecipes(usersRecipes: UsersRecipes): Observable<UsersRecipes> {
    return this.http.post<UsersRecipes>(`${this.apiUrl}`, usersRecipes);
  }

  updateUsersRecipes(id: number, usersRecipes: UsersRecipes): Observable<UsersRecipes> {
    return this.http.put<UsersRecipes>(`${this.apiUrl}/${id}`, usersRecipes);
  }

  deleteUsersRecipes(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /*getByUserId(userId: number): Observable<UsersRecipes[]> {
    return this.http.get<UsersRecipes[]>(`${this.apiUrl}/user/${userId}`);
  }

  getByRecipeId(recipeId: number): Observable<UsersRecipes[]> {
    return this.http.get<UsersRecipes[]>(`${this.apiUrl}/recipe/${recipeId}`);
  }*/
}