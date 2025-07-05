import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface FoodItem {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  brand: string;
  time?: string;
}

@Component({
  selector: 'app-scan-food',
  imports: [CommonModule, RouterModule],
  templateUrl: './scan-food.html',
  styleUrl: './scan-food.css'
})
export class ScanFood {
  isScanning = false;
  recentScans: FoodItem[] = [
    { name: 'Greek Yogurt - Chobani', calories: 130, protein: 23, carbs: 9, brand: 'Chobani', time: 'Scanned 5 minutes ago • 150g serving' },
    { name: 'Banana - Medium', calories: 105, protein: 1, carbs: 27, brand: 'Organic', time: 'Photo recognition • 1 hour ago' },
    { name: 'Whole Grain Bread', calories: 80, protein: 3, carbs: 15, brand: 'Generic', time: 'Barcode scan • 2 hours ago' }
  ];

  foodDatabase: FoodItem[] = [
    { name: 'Greek Yogurt - Chobani', calories: 130, protein: 23, carbs: 9, brand: 'Chobani' },
    { name: 'Whole Grain Cereal', calories: 110, protein: 3, carbs: 23, brand: 'Kellogg\'s' },
    { name: 'Almond Milk', calories: 60, protein: 1, carbs: 8, brand: 'Blue Diamond' },
    { name: 'Protein Bar', calories: 190, protein: 20, carbs: 15, brand: 'Quest' },
    { name: 'Organic Banana', calories: 105, protein: 1, carbs: 27, brand: 'Organic' },
    { name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, brand: 'Fresh' }
  ];

  startScanning(): void {
    if (this.isScanning) return;
    this.isScanning = true;
    const overlay = document.getElementById('cameraOverlay');
    if (overlay) overlay.style.display = 'flex';

    setTimeout(() => {
      this.closeCamera();
      this.simulateSuccessfulScan();
    }, 3000);
  }

  closeCamera(): void {
    const overlay = document.getElementById('cameraOverlay');
    if (overlay) overlay.style.display = 'none';
  }

  resetScanner(): void {
    this.isScanning = false;
  }

  simulateSuccessfulScan(): void {
    const randomFood = this.foodDatabase[Math.floor(Math.random() * this.foodDatabase.length)];
    const confirmResult = window.confirm(
      `🎉 Producto escaneado exitosamente!\n\n📦 ${randomFood.brand}\n🥗 ${randomFood.name}\n🔥 Calorías: ${randomFood.calories}\n💪 Proteína: ${randomFood.protein}g\n🌾 Carbs: ${randomFood.carbs}g\n\n¿Agregar a tu diario alimenticio?`
    );

    if (confirmResult) {
      this.addToRecentScans(randomFood);
      alert('✅ Comida añadida al diario.');
    }

    this.resetScanner();
  }

  addToRecentScans(food: FoodItem): void {
    this.recentScans.unshift({
      ...food,
      time: 'Barcode scan • Just now'
    });
  }

  scanBarcode(): void {
    this.startScanning();
  }

  takePhoto(): void {
    alert('📸 Función de reconocimiento por imagen aún no implementada.');
  }

  voiceSearch(): void {
    alert('🎤 Función de búsqueda por voz aún no implementada.');
  }

  ngOnInit(): void {
    document.body.classList.add('scan-food-body');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('scan-food-body');
  }
}
