import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-recipe',
  imports: [],
  templateUrl: './recipe.html',
  styleUrl: './recipe.css'
})
export class Recipe {
  @Input() username = '';
  @Output() addFavoriteEvent = new EventEmitter<string>();

  fav(recipeName: string){
    //alert(`A ${this.username} le gusta cocinar ${recipeName}`);
    this.addFavoriteEvent.emit(recipeName);
  }

  recipes = [
    {
      id: 1,
      name: 'Spaguetis'
    },
    {
      id: 2,
      name: 'Barbacoa'
    },
    {
      id: 3,
      name: 'Banana Split'
    }
  ]
}
