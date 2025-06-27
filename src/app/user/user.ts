import { Component } from '@angular/core';
import { Recipe } from "../recipe/recipe";

@Component({
  selector: 'app-user',
  imports: [Recipe],
  templateUrl: './user.html',
  styleUrl: './user.css'
})
export class User {
  username = 'rekken';
  isLoggedIn = false; // <- está funcionando como un state
  favRecipe = '';

  getFavorite(recipeName: string) {
    this.favRecipe = recipeName;
  }

  greet() {
    alert('Hola!!!');
  }
}
