import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface FoodItem {
  id: number;
  name: string;
  category: string;
  serving: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

@Component({
  selector: 'app-food-list',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './food-list.html',
  styleUrl: './food-list.css'
})
export class FoodList {
  foods: FoodItem[] = [
    { id: 1, name: "Apple", category: "fruits", serving: "1 medium (182g)", calories: 95, protein: 0.5, carbs: 25, fat: 0.3, fiber: 4.4 },
    { id: 2, name: "Banana", category: "fruits", serving: "1 medium (118g)", calories: 105, protein: 1.3, carbs: 27, fat: 0.4, fiber: 3.1 },
    { id: 3, name: "Chicken Breast", category: "proteins", serving: "100g", calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0 },
    { id: 4, name: "Broccoli", category: "vegetables", serving: "1 cup (91g)", calories: 25, protein: 3, carbs: 5, fat: 0.3, fiber: 2.3 },
    { id: 5, name: "Brown Rice", category: "grains", serving: "1 cup cooked (195g)", calories: 216, protein: 5, carbs: 45, fat: 1.8, fiber: 3.5 },
    { id: 6, name: "Salmon", category: "proteins", serving: "100g", calories: 208, protein: 20, carbs: 0, fat: 13, fiber: 0 },
    { id: 7, name: "Spinach", category: "vegetables", serving: "1 cup (30g)", calories: 7, protein: 0.9, carbs: 1.1, fat: 0.1, fiber: 0.7 },
    { id: 8, name: "Greek Yogurt", category: "dairy", serving: "1 cup (245g)", calories: 130, protein: 23, carbs: 9, fat: 0.4, fiber: 0 },
    { id: 9, name: "Avocado", category: "fruits", serving: "1 medium (150g)", calories: 234, protein: 2.9, carbs: 12, fat: 21, fiber: 10 },
    { id: 10, name: "Quinoa", category: "grains", serving: "1 cup cooked (185g)", calories: 222, protein: 8, carbs: 39, fat: 3.6, fiber: 5.2 },
    { id: 11, name: "Sweet Potato", category: "vegetables", serving: "1 medium (128g)", calories: 112, protein: 2, carbs: 26, fat: 0.1, fiber: 3.9 },
    { id: 12, name: "Almonds", category: "proteins", serving: "1 oz (28g)", calories: 164, protein: 6, carbs: 6, fat: 14, fiber: 3.5 },
    { id: 13, name: "Blueberries", category: "fruits", serving: "1 cup (148g)", calories: 84, protein: 1.1, carbs: 21, fat: 0.5, fiber: 3.6 },
    { id: 14, name: "Eggs", category: "proteins", serving: "1 large (50g)", calories: 70, protein: 6, carbs: 0.6, fat: 5, fiber: 0 },
    { id: 15, name: "Oats", category: "grains", serving: "1 cup dry (81g)", calories: 307, protein: 11, carbs: 55, fat: 5, fiber: 8 },
  ];

  currentCategory = 'all';
  currentSearch = '';
  filteredFoods: FoodItem[] = [...this.foods];

  get totalFoods() {
    return this.foods.length;
  }

  get categoriesCount() {
    return new Set(this.foods.map(f => f.category)).size;
  }

  get searchResults() {
    return this.filteredFoods.length;
  }

  filterFoods() {
    this.filteredFoods = this.foods.filter(food => {
      const categoryMatch = this.currentCategory === 'all' || food.category === this.currentCategory;
      const searchMatch = !this.currentSearch || food.name.toLowerCase().includes(this.currentSearch.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }

  onSearchChange(search: string) {
    this.currentSearch = search;
    this.filterFoods();
  }

  onCategorySelect(category: string) {
    this.currentCategory = category;
    this.filterFoods();
  }

  addFood(id: number) {
    console.log(`Added food with ID ${id}`);
  }

  ngOnInit(): void {
    document.body.classList.add('food-list-body');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('food-list-body');
  }
}
