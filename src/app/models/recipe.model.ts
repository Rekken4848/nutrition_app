import { RecipeIngredient } from "./recipe-ingredient.model";
import { RecipeInstruction } from "./recipe-instruction.model";

export class Recipe {
    id?: number;
    recipeName!: string;
    recipeDescription?: string;
    recipeCategory!: string;
    recipeDiet?: string;
    prepTime!: number;
    cookTime?: number;
    servings!: number;
    difficulty?: string;
    emoji?: string;
    imageFile?: File;
    ingredients!: RecipeIngredient[];
    instructions!: RecipeInstruction[];
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
    fiber?: number;
    sugar?: number;
    tags?: string[];
}