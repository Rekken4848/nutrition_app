export class Food {
    code!: string;
    name!: string;
    brand!: string;
    quantity?: string;
    product_quantity?: number;
    product_quantity_unit?: string;
    serving_size?: string;
    calories_per_serving?: number;
    calories_per_100g?: number;
    proteins_per_100g?: number;
    fat_per_100g?: number;
    carbs_per_100g?: number;
    sugars_per_100g?: number;
    fiber_per_100g?: number;
    image?: string;
    nutriscore?: string;
    allergens?: string[];
    ingredients?: string;
    countries?: string[];
}