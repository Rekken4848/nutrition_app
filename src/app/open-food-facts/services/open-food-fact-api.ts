import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Food } from '../models/food.model';

@Injectable({
  providedIn: 'root'
})
export class OpenFoodFactApi {

  private apiUrl = '/cgi/search.pl';

  constructor(private http: HttpClient) { }

  private round(val?: number): number | undefined {
    return val !== undefined ? Math.round(val * 100) / 100 : undefined;
  }

  searchProducts(term: string, country?: string, category?: string): Observable<Food[]> {
    let params = new HttpParams()
      .set('search_terms', term)
      .set('search_simple', '1')
      .set('action', 'process')
      .set('json', '1')
      // .set('page_size', '100')
      .set('page', '1');

    if (country) {
      params = params
        .set('tagtype_0', 'countries')
        .set('tag_contains_0', 'contains')
        .set('tag_0', country.toLowerCase());
    }

    if (category) {
      const baseIndex = country ? 1 : 0;
      params = params
        .set(`tagtype_${baseIndex}`, 'categories')
        .set(`tag_contains_${baseIndex}`, 'contains')
        .set(`tag_${baseIndex}`, category.toLowerCase());
    }

    return this.http.get<any>(this.apiUrl, { params }).pipe(
      map((res) => {
        const products = res.products || [];
        return products.map((p: any) => ({
          code: p.code,
          name: p.product_name || 'Desconocido',
          brand: p.brands || 'Sin marca',
          quantity: p.quantity,
          product_quantity: this.round(p.product_quantity),
          product_quantity_unit: p.product_quantity_unit,
          serving_size: p.serving_size,
          calories_per_serving: this.round(p.nutriments?.['energy-kcal_serving']),
          calories_per_100g: this.round(p.nutriments?.['energy-kcal_100g']),
          proteins_per_100g: this.round(p.nutriments?.['proteins_100g']),
          fat_per_100g: this.round(p.nutriments?.['fat_100g']),
          carbs_per_100g: this.round(p.nutriments?.['carbohydrates_100g']),
          sugars_per_100g: this.round(p.nutriments?.['sugars_100g']),
          fiber_per_100g: this.round(p.nutriments?.['fiber_100g']),
          image: p.image_front_url,
          nutriscore: p.nutriscore_grade,
          allergens: p.allergens_tags || [],
          ingredients: p.ingredients_text,
          countries: p.countries_tags || [],
        })) as Food[];
      }),
      catchError((err) => {
        console.error('Error al buscar productos:', err);
        return of([]); // Devuelve un array vacío en caso de error
      })
    );
  }

  getProductByBarcode(barcode: string): Observable<Food | null> {
    const url = `/api/v2/product/${barcode}.json`;

    return this.http.get<any>(url).pipe(
      map((res) => {
        const p = res.product;
        if (!p) return null;

        return {
          code: p.code,
          name: p.product_name || 'Desconocido',
          brand: p.brands || 'Sin marca',
          quantity: p.quantity,
          product_quantity: this.round(p.product_quantity),
          product_quantity_unit: p.product_quantity_unit,
          serving_size: p.serving_size,
          calories_per_serving: this.round(p.nutriments?.['energy-kcal_serving']),
          calories_per_100g: this.round(p.nutriments?.['energy-kcal_100g']),
          proteins_per_100g: this.round(p.nutriments?.['proteins_100g']),
          fat_per_100g: this.round(p.nutriments?.['fat_100g']),
          carbs_per_100g: this.round(p.nutriments?.['carbohydrates_100g']),
          sugars_per_100g: this.round(p.nutriments?.['sugars_100g']),
          fiber_per_100g: this.round(p.nutriments?.['fiber_100g']),
          image: p.image_front_url,
          nutriscore: p.nutriscore_grade,
          allergens: p.allergens_tags || [],
          ingredients: p.ingredients_text,
          countries: p.countries_tags || [],
        } as Food;
      }),
      catchError((err) => {
        console.error(`Error al buscar por código de barras ${barcode}:`, err);
        return of(null);
      })
    );
  }
}
