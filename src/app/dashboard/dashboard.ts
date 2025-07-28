import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserStatsService } from '../services/user-stats-service';
import { UserWithStatsDto } from '../models/user-with-stats-dto.model';

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
    { label: 'Carbohydrates', value: 156, goal: 250, class: 'carbs' },
    { label: 'Fat', value: 42, goal: 67, class: 'fat' }
  ];

  navigateToKitchen() {
    this.router.navigate(['/kitchen']);
  }

  addFood(mealType: string) {
    alert(`🍽️ Add Food to ${mealType.charAt(0).toUpperCase() + mealType.slice(1)}\n\nOptions:\n• Scan barcode\n• Search database\n• Create custom food\n• Use voice input`);
  }

  ngAfterViewInit(): void {
    // Animación de tarjetas al cargar
    const cards = document.querySelectorAll('.stat-card, .meal-card');
    cards.forEach((card, index) => {
      (card as HTMLElement).style.opacity = '0';
      (card as HTMLElement).style.transform = 'translateY(20px)';
      setTimeout(() => {
        (card as HTMLElement).style.transition = 'all 0.6s ease';
        (card as HTMLElement).style.opacity = '1';
        (card as HTMLElement).style.transform = 'translateY(0)';
      }, index * 100);
    });

    // Animación de barras de progreso
    setTimeout(() => {
      const progressBars = document.querySelectorAll('.progress-bar');
      progressBars.forEach(bar => {
        const width = (bar as HTMLElement).style.width;
        (bar as HTMLElement).style.width = '0%';
        setTimeout(() => {
          (bar as HTMLElement).style.width = width;
        }, 500);
      });
    }, 800);

    // Simulación de actualización en tiempo real
    setInterval(() => this.updateProgress(), 300000); // cada 5 min
  }

  updateProgress(): void {
    console.log('Updating nutrition progress...');
    // Aquí podrías hacer llamadas a un servicio para actualizar datos
  }

  userWithStatsDto: UserWithStatsDto | null = null;

  constructor(private userStatsService: UserStatsService, private router: Router) { }

  ngOnInit(): void {
    //let userService: UserService;
    document.body.classList.add('dashboard-body');
    const email = localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail')
    if (email) {
      this.userStatsService.getUserAndStatsByEmail(email).subscribe({
        next: (userWithStatsDto) => {
          this.userWithStatsDto = userWithStatsDto
          console.log("Usuario con Stats dashboard: ", userWithStatsDto);
        },
        error: (err) => {
          console.error('Error cargando usuario', err)
        }
      });
    }


  }

  ngOnDestroy(): void {
    document.body.classList.remove('dashboard-body');
  }
}
