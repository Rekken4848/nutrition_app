import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeIngredient } from '../models/recipe-ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeIngredientService {

  private apiUrl = 'http://localhost:8080/recipeingredient';

  constructor(private http: HttpClient) { }

  getRecipesIngredients(): Observable<RecipeIngredient[]> {
    return this.http.get<RecipeIngredient[]>(`${this.apiUrl}`);
  }

  getRecipeIngredientById(id: number): Observable<RecipeIngredient> {
    return this.http.get<RecipeIngredient>(`${this.apiUrl}/${id}`);
  }

  createRecipeIngredient(recipeIngredient: RecipeIngredient): Observable<RecipeIngredient> {
    return this.http.post<RecipeIngredient>(`${this.apiUrl}`, recipeIngredient);
  }

  updateRecipeIngredient(id: number, recipeIngredient: RecipeIngredient): Observable<RecipeIngredient> {
    return this.http.put<RecipeIngredient>(`${this.apiUrl}/${id}`, recipeIngredient);
  }

  deleteRecipeIngredient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
