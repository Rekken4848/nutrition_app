import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  today: string = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  userName: string = 'John';

  stats = [
    { icon: '🔥', value: '1,247', label: 'Calories Consumed' },
    { icon: '💪', value: '89g', label: 'Protein' },
    { icon: '🌾', value: '156g', label: 'Carbohydrates' },
    { icon: '🥑', value: '42g', label: 'Fat' }
  ];

  progress = [
    { label: 'Calories', value: 1247, goal: 2000, class: 'calories' },
    { label: 'Protein', value: 89, goal: 150, class: 'protein' },
    { label: 'Carbohydrates', value: 156, goal: 250, class: 'carbs' }
  ];

  navigateToKitchen() {
    // Aquí se puede usar Angular Router si se desea
    console.log('Navigating to Smart Kitchen...');
  }

  ngOnInit(): void {
    document.body.classList.add('dashboard-body');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('dashboard-body');
  }
}
