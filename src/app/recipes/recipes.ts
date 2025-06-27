import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Recipe {
  id: number;
  title: string;
  category: string;
  diet: string;
  time: string;
  servings: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  tags: string[];
  emoji: string;
}

@Component({
  selector: 'app-recipes',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './recipes.html',
  styleUrl: './recipes.css'
})
export class Recipes {
  recipes: Recipe[] = [
    {
      id: 1,
      title: "Quinoa Buddha Bowl",
      category: "lunch",
      diet: "vegetarian",
      time: "25 min",
      servings: 2,
      calories: 420,
      protein: 18,
      carbs: 52,
      fat: 14,
      tags: ["High Protein", "Vegetarian", "Gluten-Free"],
      emoji: "🥗"
    },
    {
      id: 2,
      title: "Grilled Salmon with Asparagus",
      category: "dinner",
      diet: "keto",
      time: "20 min",
      servings: 1,
      calories: 380,
      protein: 35,
      carbs: 8,
      fat: 24,
      tags: ["High Protein", "Keto", "Low Carb"],
      emoji: "🐟"
    },
    {
      id: 3,
      title: "Overnight Oats with Berries",
      category: "breakfast",
      diet: "vegetarian",
      time: "5 min",
      servings: 1,
      calories: 320,
      protein: 12,
      carbs: 58,
      fat: 8,
      tags: ["Quick", "Vegetarian", "High Fiber"],
      emoji: "🥣"
    },
    {
      id: 4,
      title: "Avocado Toast Supreme",
      category: "breakfast",
      diet: "vegetarian",
      time: "10 min",
      servings: 1,
      calories: 290,
      protein: 8,
      carbs: 32,
      fat: 18,
      tags: ["Quick", "Vegetarian", "Healthy Fats"],
      emoji: "🥑"
    },
    {
      id: 5,
      title: "Chicken Stir Fry",
      category: "dinner",
      diet: "",
      time: "15 min",
      servings: 2,
      calories: 350,
      protein: 28,
      carbs: 25,
      fat: 16,
      tags: ["High Protein", "Quick", "Low Carb"],
      emoji: "🍗"
    },
    {
      id: 6,
      title: "Green Smoothie Bowl",
      category: "breakfast",
      diet: "vegan",
      time: "8 min",
      servings: 1,
      calories: 280,
      protein: 15,
      carbs: 45,
      fat: 9,
      tags: ["Vegan", "Antioxidants", "Quick"],
      emoji: "🥬"
    },
    {
      id: 7,
      title: "Mediterranean Wrap",
      category: "lunch",
      diet: "vegetarian",
      time: "12 min",
      servings: 1,
      calories: 340,
      protein: 14,
      carbs: 42,
      fat: 16,
      tags: ["Mediterranean", "Vegetarian", "Portable"],
      emoji: "🌯"
    },
    {
      id: 8,
      title: "Protein Energy Balls",
      category: "snack",
      diet: "vegan",
      time: "15 min",
      servings: 12,
      calories: 95,
      protein: 4,
      carbs: 12,
      fat: 4,
      tags: ["Vegan", "No-Bake", "Protein"],
      emoji: "⚡"
    }
    // ... agrega los demás aquí
  ];

  filteredRecipes: Recipe[] = [];
  searchTerm: string = '';
  category: string = '';
  diet: string = '';

  ngOnInit(): void {
    document.body.classList.add('recipes-body');
    this.filteredRecipes = this.recipes;
  }

  ngOnDestroy(): void {
    document.body.classList.remove('recipes-body');
  }

  filterRecipes(): void {
    this.filteredRecipes = this.recipes.filter(recipe => {
      const matchesSearch = this.searchTerm === '' || recipe.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = this.category === '' || recipe.category === this.category;
      const matchesDiet = this.diet === '' || recipe.diet === this.diet;
      return matchesSearch && matchesCategory && matchesDiet;
    });
  }

  viewRecipe(id: number): void {
    // Lógica de navegación o modal
    console.log('Viewing recipe ID:', id);
  }
}
