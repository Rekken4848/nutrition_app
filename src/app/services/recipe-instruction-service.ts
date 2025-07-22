import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeInstruction } from '../models/recipe-instruction.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeInstructionService {

  private apiUrl = 'http://localhost:8080/recipeinstruction';

  constructor(private http: HttpClient) { }

  getRecipesInstructions(): Observable<RecipeInstruction[]> {
    return this.http.get<RecipeInstruction[]>(`${this.apiUrl}`);
  }

  getRecipeInstructionById(id: number): Observable<RecipeInstruction> {
    return this.http.get<RecipeInstruction>(`${this.apiUrl}/${id}`);
  }

  createRecipeInstruction(recipeInstruction: RecipeInstruction): Observable<RecipeInstruction> {
    return this.http.post<RecipeInstruction>(`${this.apiUrl}`, recipeInstruction);
  }

  updateRecipeInstruction(id: number, recipeInstruction: RecipeInstruction): Observable<RecipeInstruction> {
    return this.http.put<RecipeInstruction>(`${this.apiUrl}/${id}`, recipeInstruction);
  }

  deleteRecipeInstruction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
