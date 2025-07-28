import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OpenFoodFactApi } from '../open-food-facts/services/open-food-fact-api';
import { Food } from '../open-food-facts/models/food.model';
import { FoodService } from '../services/food-service';

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
  image: string;
  quantity: number;
}

@Component({
  selector: 'app-food-list',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './food-list.html',
  styleUrl: './food-list.css'
})
export class FoodList {
  foods: FoodItem[] = [
    { id: 1, name: "Apple", category: "fruits", serving: "1 medium (182g)", calories: 95, protein: 0.5, carbs: 25, fat: 0.3, fiber: 4.4, image: "https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg", quantity: 20 },
    { id: 2, name: "Banana", category: "fruits", serving: "1 medium (118g)", calories: 105, protein: 1.3, carbs: 27, fat: 0.4, fiber: 3.1, image: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Banana-Single.jpg", quantity: 15 },
    { id: 3, name: "Chicken Breast", category: "proteins", serving: "100g", calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0, image: "", quantity: 20 },
    { id: 4, name: "Broccoli", category: "vegetables", serving: "1 cup (91g)", calories: 25, protein: 3, carbs: 5, fat: 0.3, fiber: 2.3, image: "https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg", quantity: 20 },
    { id: 5, name: "Brown Rice", category: "grains", serving: "1 cup cooked (195g)", calories: 216, protein: 5, carbs: 45, fat: 1.8, fiber: 3.5, image: "https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg", quantity: 20 },
    { id: 6, name: "Salmon", category: "proteins", serving: "100g", calories: 208, protein: 20, carbs: 0, fat: 13, fiber: 0, image: "https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg", quantity: 20 },
    { id: 7, name: "Spinach", category: "vegetables", serving: "1 cup (30g)", calories: 7, protein: 0.9, carbs: 1.1, fat: 0.1, fiber: 0.7, image: "https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg", quantity: 20 },
    { id: 8, name: "Greek Yogurt", category: "dairy", serving: "1 cup (245g)", calories: 130, protein: 23, carbs: 9, fat: 0.4, fiber: 0, image: "https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg", quantity: 20 },
    { id: 9, name: "Avocado", category: "fruits", serving: "1 medium (150g)", calories: 234, protein: 2.9, carbs: 12, fat: 21, fiber: 10, image: "https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg", quantity: 20 },
    { id: 10, name: "Quinoa", category: "grains", serving: "1 cup cooked (185g)", calories: 222, protein: 8, carbs: 39, fat: 3.6, fiber: 5.2, image: "https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg", quantity: 20 },
    { id: 11, name: "Sweet Potato", category: "vegetables", serving: "1 medium (128g)", calories: 112, protein: 2, carbs: 26, fat: 0.1, fiber: 3.9, image: "https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg", quantity: 20 },
    { id: 12, name: "Almonds", category: "proteins", serving: "1 oz (28g)", calories: 164, protein: 6, carbs: 6, fat: 14, fiber: 3.5, image: "https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg", quantity: 20 },
    { id: 13, name: "Blueberries", category: "fruits", serving: "1 cup (148g)", calories: 84, protein: 1.1, carbs: 21, fat: 0.5, fiber: 3.6, image: "https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg", quantity: 20 },
    { id: 14, name: "Eggs", category: "proteins", serving: "1 large (50g)", calories: 70, protein: 6, carbs: 0.6, fat: 5, fiber: 0, image: "https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg", quantity: 20 },
    { id: 15, name: "Oats", category: "grains", serving: "1 cup dry (81g)", calories: 307, protein: 11, carbs: 55, fat: 5, fiber: 8, image: "https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg", quantity: 20 },
  ];

  //currentCategory = 'all';
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

  COMMON_CATEGORIES = [
    'snacks',
    'chocolates',
    'beverages',
    'pizzas',
    'cheeses',
    'plant-based-foods',
    'vegan-foods',
    'meats',
    'breakfast-cereals',
    'desserts',
    'sauces',
    'prepared-meals',
    'cheese',
  ];

  COMMON_COUNTRIES = [
    'usa',
    'canada',
    'uk',
    'france',
    'germany',
    'spain',
    'italy',
    'japan',
    'australia',
  ];

  showCommonCategories = false;

  showCountryCategories = false;

  currentCategory: string = '';

  currentCountry: string = '';

  onCategorySelect(category: string) {
    if (this.currentSearch !== '') {
      this.currentCategory = category;
      this.searchNewFoods(this.currentSearch, this.currentCountry, category);
      this.showCommonCategories = false;
    }
  }

  onCountrySelect(country: string) {
    if (this.currentSearch !== '') {
      this.currentCountry = country;
      this.searchNewFoods(this.currentSearch, country, this.currentCategory);
      this.showCountryCategories = false;
    }
  }

  myFoodsActive: boolean = false

  getMyFoods(): void {
    const email = localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail')
    if (email === null) return;
    this.foodService.getFoodByUser(email).subscribe({
      next: (res) => {
        console.log("My foods: ", res);
        this.foodListApi = res.map((food: any) => ({
          ...food,
          serving_size: food.servingSize,
          calories_per_100g: food.caloriesPer100g,
          calories_per_serving: food.caloriesPerServing,
          proteins_per_100g: food.proteinsPer100g,
          fat_per_100g: food.fatPer100g,
          carbs_per_100g: food.carbsPer100g,
          sugars_per_100g: food.sugarsPer100g,
          fiber_per_100g: food.fiberPer100g,
          product_quantity: food.productQuantity,
          product_quantity_unit: food.productQuantityUnit
        }));
        this.filteredFoodListApi = [...this.foodListApi];
        this.myFoodsActive = true;
      },
      error: (err) => {
        console.error('Error cargando mis comidas', err)
      }
    });
  }

  filterFoods() {
    /*this.filteredFoods = this.foods.filter(food => {
      const categoryMatch = this.currentCategory === 'all' || food.category === this.currentCategory;
      const searchMatch = !this.currentSearch || food.name.toLowerCase().includes(this.currentSearch.toLowerCase());
      return categoryMatch && searchMatch;
    });*/
    this.filteredFoodListApi = this.foodListApi.filter(food => {
      const categoryMatch = this.currentCategory === 'all' || food.name === this.currentCategory;
      const searchMatch = !this.currentSearch || food.name.toLowerCase().includes(this.currentSearch.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }

  searchNewFoods(search: string, country?: string, category?: string) {
    this.currentSearch = search;
    this.openFoodFactApi.searchProducts(search, country, category).subscribe({
      next: (res) => {
        console.log("open Food Fact Api: ", res);
        this.foodListApi = res;
        this.filteredFoodListApi = [...this.foodListApi];
        this.myFoodsActive = false;
      },
      error: (err) => {
        console.error('Error cargando api', err)
      }
    });
  }

  onSearchChange(search: string) {
    //this.currentSearch = search;
    //this.filterFoods();
  }

  /*onCategorySelect(category: string) {
    this.currentCategory = category;
    this.filterFoods();
  }*/

  addFood(code: string) {
    const food = this.foodListApi.find(food => food.code === code);
    const email = localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail')
    if (food !== undefined && email !== null) {
      this.foodService.createFood(email, food).subscribe({
        next: (res) => {
          console.log(`Added food with code ${code}`);
          console.log(res)
        },
        error: (err) => {
          console.error('Error cargando api', err)
        }
      });
    }
  }

  constructor(private openFoodFactApi: OpenFoodFactApi, private foodService: FoodService) { }

  foodListApi: Food[] = [];
  filteredFoodListApi: Food[] = [];

  ngOnInit(): void {
    document.body.classList.add('food-list-body');
    /*this.openFoodFactApi.searchProducts('Lays', 'spain').subscribe({
      next: (res) => {
        console.log("open Food Fact Api: ", res);
        this.foodListApi = res
        this.filteredFoodListApi = [...this.foodListApi];
      },
      error: (err) => {
        console.error('Error cargando api', err)
      }
    });*/
  }

  ngOnDestroy(): void {
    document.body.classList.remove('food-list-body');
  }
}
