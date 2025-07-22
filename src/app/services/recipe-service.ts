import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private apiUrl = 'http://localhost:8080/recipe';

  constructor(private http: HttpClient) { }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiUrl}`);
  }

  getRecipeById(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.apiUrl}/${id}`);
  }

  getRecipeByUser(email: string): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiUrl}/myrecipes/${email}`);
  }

  createRecipe(email: string, recipe: Recipe, file?: File): Observable<Recipe> {
    const formData = new FormData();

    if (file) {
      formData.append('image', file);
    }

    formData.append(
      'recipe',
      new Blob([JSON.stringify(recipe)], { type: 'application/json' })
    );
    return this.http.post<Recipe>(`${this.apiUrl}/${email}`, formData);
  }

  updateRecipe(id: number, email: string, recipe: Recipe, file: File): Observable<Recipe> {
    const formData = new FormData();

    formData.append('image', file);

    formData.append(
      'recipe',
      new Blob([JSON.stringify(recipe)], { type: 'application/json' })
    );
    return this.http.put<Recipe>(`${this.apiUrl}/${id}/${email}`, formData);
  }

  deleteRecipe(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /*getRecipesByCategory(category: string): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiUrl}/category/${category}`);
  }*/
}