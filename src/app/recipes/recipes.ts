import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
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
  imports: [CommonModule, RouterModule, FormsModule, DragDropModule],
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

  // Recipe Form

  /*openCreateRecipeModal(): void {
    //document.getElementById('createRecipeModal').classList.add('show');
    //document.body.style.overflow = 'hidden';

    const modal = document.getElementById('createRecipeModal');
    if (modal) {
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  }

  closeCreateRecipeModal(): void {
    const modal = document.getElementById('createRecipeModal');
    if (modal) {
      modal.classList.remove('show');
    }
    document.body.style.overflow = 'auto';
    //document.getElementById('createRecipeForm').reset();
    const form = document.getElementById('createRecipeForm');
    if (form) {
      //form.reset();
    }

    // Reset dynamic lists
    resetIngredientsList();
    resetInstructionsList();

    // Reset image/emoji selection
    resetImageEmojiSelection();
  }*/

  createRecipe(): void {
    alert(`📝 Create New Recipe

Choose how you'd like to create your recipe:

🤖 AI Recipe Generator
   • Describe your preferences
   • Get AI-generated recipes
   • Customize ingredients and steps

✍️ Manual Recipe Entry
   • Add your own recipe
   • Upload photos
   • Set nutritional information

📸 Recipe from Photo
   • Scan recipe from cookbook
   • Extract ingredients automatically
   • Edit and customize

Which option would you prefer?`);
  }

  viewRecipe(id: number): void {
    // Lógica de navegación o modal
    console.log('Viewing recipe ID:', id);
  }

  viewRecipe2(recipeName: string): void {
    alert(`👨‍🍳 Opening Recipe: ${recipeName}

This would show:
• Complete ingredient list
• Step-by-step instructions
• Nutritional breakdown
• Cooking tips and variations
• User reviews and ratings

Redirecting to recipe details...`);
  }

  @ViewChild('createRecipeModal') createRecipeModal!: ElementRef<HTMLDivElement>;
  @ViewChild('createRecipeForm') createRecipeForm!: ElementRef<HTMLFormElement>;
  @ViewChild('createRecipeForm') createRecipeNgForm!: NgForm;
  @ViewChild('selectedEmoji') selectedEmoji!: ElementRef<HTMLInputElement>;
  @ViewChild('selectedEmojiDisplay') selectedEmojiDisplay!: ElementRef;
  @ViewChild('selectedEmojiPreview') selectedEmojiPreview!: ElementRef;
  @ViewChild('imagePreview') imagePreview!: ElementRef<HTMLImageElement>;
  @ViewChild('imageUploadText') imageUploadText!: ElementRef;
  @ViewChild('ingredientsList') ingredientsList!: ElementRef;
  @ViewChild('instructionsList') instructionsList!: ElementRef;
  @ViewChild('recipeImage') recipeImage!: ElementRef<HTMLInputElement>;
  selectedEmojiValue = '';

  /*recipe = {
    recipeName: '',
    recipeDescription: '',
    recipeCategory: '',
    recipeDiet: '',
    prepTime: null,
    cookTime: null,
    servings: null,
    difficulty: '',
  };*/
  recipe = {
    recipeName: '',
    recipeDescription: '',
    recipeCategory: '',
    recipeDiet: '',
    prepTime: null,
    cookTime: null,
    servings: null,
    difficulty: '',
    emoji: '',
    imageFile: null as File | null,
    ingredients: [
      {
        quantity: '',
        unit: '',
        name: ''
      }
    ],
    instructions: [
      {
        text: '',
        time: ''
      }
    ],
    calories: null,
    protein: null,
    carbs: null,
    fat: null,
    fiber: null,
    sugar: null
  };

  constructor(private renderer: Renderer2) { }

  openCreateRecipeModal(): void {
    this.renderer.addClass(this.createRecipeModal.nativeElement, 'show');
    document.body.style.overflow = 'hidden';
  }

  closeCreateRecipeModal(): void {
    this.renderer.removeClass(this.createRecipeModal.nativeElement, 'show');
    document.body.style.overflow = 'auto';
    //this.createRecipeForm.nativeElement.reset();
    this.createRecipeNgForm.resetForm();
    this.resetIngredientsList();
    this.resetInstructionsList();
    this.resetImageEmojiSelection();
    this.activeTab = 'emoji';
  }

  resetForm(form: HTMLFormElement) {
    form.reset();
    this.recipe = {
      recipeName: '',
      recipeDescription: '',
      recipeCategory: '',
      recipeDiet: '',
      prepTime: null,
      cookTime: null,
      servings: null,
      difficulty: '',
      emoji: '',
      imageFile: null as File | null,
      ingredients: [
        {
          quantity: '',
          unit: '',
          name: ''
        }
      ],
      instructions: [
        {
          text: '',
          time: ''
        }
      ],
      calories: null,
      protein: null,
      carbs: null,
      fat: null,
      fiber: null,
      sugar: null
    };
    //this.imagePreview.nativeElement.style.display = 'none';
    //this.selectedEmojiInput.nativeElement.value = '';
    //this.activeTab = 'emoji';

    // Limpiar selección de emoji
    /*this.selectedEmojiValue = '';
    this.selectedEmojiDisplay.nativeElement.textContent = '';
    this.selectedEmoji.nativeElement.value = '';
    this.selectedEmojiPreview.nativeElement.style.display = 'none';
    document.querySelectorAll('.emoji-option').forEach(opt => opt.classList.remove('selected'));*/

    // Limpiar imagen
    /*this.recipeImage.nativeElement.value = '';
    this.imagePreview.nativeElement.src = '';
    this.imagePreview.nativeElement.style.display = 'none';
    this.imageUploadText.nativeElement.style.display = 'block';*/

    this.activeTab = 'emoji';
  }

  switchTab2(button: EventTarget | null, tabName: string): void {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

    if (button && button instanceof HTMLElement) {
      button.classList.add('active');
    }

    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    document.getElementById(tabName + 'Tab')?.classList.add('active');
  }

  activeTab: 'emoji' | 'image' = 'emoji';

  switchTab(tab: 'emoji' | 'image') {
    this.activeTab = tab;
  }

  selectEmoji(event: Event, emoji: string): void {
    document.querySelectorAll('.emoji-option').forEach(opt => opt.classList.remove('selected'));
    (event.target as HTMLElement).classList.add('selected');

    this.selectedEmojiValue = emoji;
    this.selectedEmoji.nativeElement.value = emoji;
    this.selectedEmojiDisplay.nativeElement.textContent = emoji;
    this.selectedEmojiPreview.nativeElement.style.display = 'flex';

    this.recipe.emoji = emoji;
  }

  previewImage(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        this.imagePreview.nativeElement.src = e.target?.result as string;
        this.imagePreview.nativeElement.style.display = 'block';
        this.imageUploadText.nativeElement.style.display = 'none';
      };
      reader.readAsDataURL(file);
      this.recipe.imageFile = file;
    }
  }

  triggerImageUpload(): void {
    this.recipeImage.nativeElement.click();
  }

  onImageUploadClick(input: HTMLInputElement) {
    console.log("Hola")
    input.click();
  }

  addIngredient(): void {
    this.recipe.ingredients.push({ quantity: '', unit: '', name: '' });
  }

  addIngredient2(): void {
    //const count = this.ingredientsList.nativeElement.children.length + 1;
    const div = this.renderer.createElement('div');
    this.renderer.addClass(div, 'ingredient-item');
    div.innerHTML = `
      <div class="ingredient-number">{{ i + 1 }}</div>
              <input type="text" class="ingredient-quantity" [(ngModel)]="ing.quantity" placeholder="2" name="ingredientQuantity" required>
              <select class="ingredient-unit" [(ngModel)]="ing.unit" name="ingredientUnit">
                <option value="cups">cups</option>
                <option value="tbsp">tbsp</option>
                <option value="tsp">tsp</option>
                <option value="oz">oz</option>
                <option value="lbs">lbs</option>
                <option value="g">g</option>
                <option value="kg">kg</option>
                <option value="ml">ml</option>
                <option value="l">l</option>
                <option value="pieces">pieces</option>
                <option value="cloves">cloves</option>
                <option value="pinch">pinch</option>
                <option value="dash">dash</option>
                <option value="">-</option>
              </select>
              <input type="text" class="ingredient-name" [(ngModel)]="ing.name" placeholder="flour" name="ingredientName" required>
              <button type="button" class="remove-btn" (click)="removeIngredient($event)">×</button>
    `;
    this.ingredientsList.nativeElement.appendChild(div);
    this.updateIngredientNumbers();
  }

  removeIngredient(index: number): void {
    this.recipe.ingredients.splice(index, 1);
  }

  removeIngredient2(event: Event): void {
    const button = event.target as HTMLElement;
    if (this.ingredientsList.nativeElement.children.length > 1) {
      button.parentElement?.remove();
      this.updateIngredientNumbers();
    }
  }

  updateIngredientNumbers(): void {
    const items = this.ingredientsList.nativeElement.querySelectorAll('.ingredient-item');
    items.forEach((item: any, index: number) => {
      item.querySelector('.ingredient-number').textContent = index + 1;
    });
  }

  addInstruction(): void {
    this.recipe.instructions.push({ text: '', time: '' });
  }

  removeInstruction(index: number): void {
    if (this.recipe.instructions.length > 1) {
      this.recipe.instructions.splice(index, 1);
    }
  }

  dropInstruction(event: CdkDragDrop<any[]>): void {
    moveItemInArray(this.recipe.instructions, event.previousIndex, event.currentIndex);
  }

  addInstruction2(): void {
    const count = this.instructionsList.nativeElement.children.length + 1;
    const div = this.renderer.createElement('div');
    this.renderer.addClass(div, 'instruction-item');
    div.innerHTML = `
      <div class="instruction-number">${count}</div>
      <textarea class="instruction-text" placeholder="Describe step ${count} in detail..." name="instructionText" required></textarea>
      <input type="text" class="instruction-time" placeholder="5 min" name="instructionTime">
      <button type="button" class="remove-btn" (click)="removeInstruction($event)">×</button>
    `;
    this.instructionsList.nativeElement.appendChild(div);
    this.updateInstructionNumbers();
  }

  removeInstruction2(event: Event): void {
    const button = event.target as HTMLElement;
    if (this.instructionsList.nativeElement.children.length > 1) {
      button.parentElement?.remove();
      this.updateInstructionNumbers();
    }
  }

  updateInstructionNumbers(): void {
    const items = this.instructionsList.nativeElement.querySelectorAll('.instruction-item');
    items.forEach((item: any, index: number) => {
      item.querySelector('.instruction-number').textContent = index + 1;
      item.querySelector('.instruction-text').placeholder = `Describe step ${index + 1} in detail...`;
    });
  }

  resetIngredientsList(): void {
    this.ingredientsList.nativeElement.innerHTML = `...`; // contenido inicial
  }

  resetInstructionsList(): void {
    this.instructionsList.nativeElement.innerHTML = `...`; // contenido inicial
  }

  resetImageEmojiSelection(): void {
    document.querySelectorAll('.emoji-option').forEach(opt => opt.classList.remove('selected'));
    this.selectedEmojiPreview.nativeElement.style.display = 'none';
    this.selectedEmoji.nativeElement.value = '';
    this.selectedEmojiValue = '';
    this.imagePreview.nativeElement.style.display = 'none';
    this.imageUploadText.nativeElement.style.display = 'block';
  }

  submitRecipe(event: Event): void {
    event.preventDefault();
    const formData = new FormData(this.createRecipeForm.nativeElement);

    // Recoge datos, igual que en tu JS
    // Lógica igual que ya tenías para mostrar alert o guardar receta

    this.closeCreateRecipeModal();
  }
}
