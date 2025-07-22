import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserMultiFormatOneDReader, IScannerControls } from '@zxing/browser';
import { OpenFoodFactApi } from '../open-food-facts/services/open-food-fact-api';
import { Food } from '../open-food-facts/models/food.model';
import { FoodService } from '../services/food-service';

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

  private codeReader = new BrowserMultiFormatOneDReader();
  private controls: IScannerControls | null = null;

  product: Food | null = null;
  showModal = false;

  constructor(private openFoodFactApi: OpenFoodFactApi, private foodService: FoodService) { }

  async startScanning() {
    this.isScanning = true;

    try {
      // ⚠️ Forzar solicitud de permisos primero
      await navigator.mediaDevices.getUserMedia({ video: true });
      // Obtener dispositivos
      const videoDevices = await BrowserMultiFormatOneDReader.listVideoInputDevices();
      const deviceId = videoDevices[0]?.deviceId;
      if (!deviceId) {
        alert('No se encontró cámara.');
        this.isScanning = false;
        return;
      }

      const videoElem = document.getElementById('video-preview') as HTMLVideoElement;

      this.controls = await this.codeReader.decodeFromVideoDevice(
        deviceId,
        videoElem,
        (result, error, controls) => {
          if (result) {
            const barcode = result.getText();
            console.log('Código escaneado:', barcode);
            this.fetchProduct(barcode);
            controls.stop();
            this.isScanning = false;
          } else if (error && error.name !== 'NotFoundException') {
            // errores menores (código no detectado) se ignoran
            //console.error('Error en escaneo:', error);
          }
        }
      );

    } catch (err: any) {
      //console.error('Error al iniciar escáner:', err);
      if (err.name === 'NotFoundError') {
        alert('No se encontró cámara. Por favor, conecta una cámara y vuelve a intentarlo.');
      } else {
        console.error('Error al iniciar escáner:', err);
      }
      this.isScanning = false;
    }
  }

  stopScanning() {
    this.controls?.stop();
    this.isScanning = false;
  }

  resetScanner() {
    this.stopScanning();
  }

  fetchProduct(barcode: string) {
    console.log(`Buscando producto: ${barcode}`);
    // Aquí tu llamada a la API
    this.openFoodFactApi.getProductByBarcode(barcode).subscribe({
      next: (product) => {
        console.log('Producto encontrado: ', product);
        this.product = product;
        this.showModal = true;
      },
      error: (err) => {
        console.log('Producto no encontrado: ', err);
      }
    });
  }

  /*get nutritionItems() {
    return [
      { label: 'Calories', value: this.product?.calories },
      { label: 'Proteins', value: this.product?.proteins },
      { label: 'Carbs', value: this.product?.carbs },
      { label: 'Fat', value: this.product?.fat },
      { label: 'Sugars', value: this.product?.sugars },
      { label: 'Fiber', value: this.product?.fiber },
    ];
  }*/

  closeProductModal() {
    this.showModal = false;
    this.product = null;
  }

  addProduct() {
    if (!this.product) return;

    const email = localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail')
    if (email !== null) {
      this.foodService.createFood(email, this.product).subscribe({
        next: (res) => {
          console.log(`Added food with code ${this.product?.code}`);
          console.log(res)
          alert("Producto añadido correctamente")
        },
        error: (err) => {
          console.error('Error cargando api', err)
        }
      });
    }

    this.closeProductModal();
  }

  startScanning2(): void {
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

  resetScanner2(): void {
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
    this.stopScanning();
  }
}
