import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserWithStatsDto } from '../models/user-with-stats-dto.model';
import { UserStatsService } from '../services/user-stats-service';
import { UserStats } from '../models/user-stats.model';

interface Stat { label: string; value: number; }
interface Achievement { icon: string; name: string; }
interface Goal { icon: string; value: string; label: string; }
interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
  activityLevel: string;
}

@Component({
  selector: 'app-profile',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
  navActive = false;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  avatarUrl: string | null = null;
  userStats: UserStats | null = null;


  activityLevels = [
    { value: 'sedentary', label: 'Sedentary (little/no exercise)' },
    { value: 'light', label: 'Light (light exercise 1-3 days/week)' },
    { value: 'moderate', label: 'Moderate (moderate exercise 3-5 days/week)' },
    { value: 'active', label: 'Active (hard exercise 6-7 days/week)' },
    { value: 'very-active', label: 'Very Active (very hard exercise, physical job)' }
  ];

  user: UserProfile = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    age: 28,
    gender: 'male',
    height: 175,
    weight: 70,
    activityLevel: 'Light (light exercise 1-3 days/week)',
  };

  stats: Stat[] = [
    { label: 'Days Active', value: 47 },
    { label: 'Current Streak', value: 12 },
    { label: 'Avg Score', value: 8.2 }
  ];

  achievements: Achievement[] = [
    { icon: '🔥', name: '7‑Day Streak' },
    { icon: '💪', name: 'Protein Goal' },
    { icon: '🥗', name: 'Healthy Eater' },
    { icon: '📊', name: 'Data Tracker' },
  ];

  goals: Goal[] = [
    { icon: '🔥', value: '2000', label: 'Calories' },
    { icon: '💪', value: '150g', label: 'Protein' },
    { icon: '🌾', value: '250g', label: 'Carbohydrates' },
    { icon: '🥑', value: '67g', label: 'Fat' },
  ];

  toggleMenu(): void {
    this.navActive = !this.navActive;
  }

  changeAvatar(): void {
    //alert('Aquí cambiaría tu avatar');
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    console.log(input)
    if (!input.files || input.files.length === 0 || this.userStats === null) return;

    const file = input.files[0];
    console.log(this.userStats)

    this.userStatsService.uploadUserStatsWithAvatar(this.userStats.user_id.id, this.userStats, file).subscribe({
      next: (res) => {
        console.log('Guardado correctamente:', res);
        if (this.userWithStatsDto !== null) {
          this.userWithStatsDto.userStats.profile_image = res.profile_image
          if (this.userStats !== null) {
            this.userStats.profile_image = res.profile_image
          }
        }
      },
      error: (err) => {
        console.error('Error al guardar con imagen:', err);
      }
    });
  }

  saveProfile(e: Event): void {
    const btn = e.target as HTMLButtonElement;
    const original = btn.textContent;

    if (this.userWithStatsDto === null) return;

    btn.textContent = 'Saving...';
    btn.disabled = true;
    /*setTimeout(() => {
      alert('Perfil guardado correctamente 😊');
      btn.textContent = original;
      btn.disabled = false;
    }, 1500);*/
    this.userStatsService.updateUserAndStats(this.userWithStatsDto).subscribe({
      next: (res) => {
        console.log('Usuario y stats actualizados correctamente');
        this.userWithStatsDto = res
        this.userStats = res.userStats
        btn.textContent = original;
        btn.disabled = false;
        //alert('Cambios guardados');
        alert('Perfil guardado correctamente 😊');
      },
      error: (err) => {
        console.error('Error al actualizar', err);
        alert('Error al guardar cambios');
      }
    });
  }

  resetForm(): void {
    /*if (confirm('¿Resetear valores al estado original?')) {
      this.user = {
        firstName: 'John', lastName: 'Doe',
        email: 'john.doe@email.com',
        age: 28, gender: 'male', height: 175, weight: 70,
        activityLevel: 'light'
      };
    }*/
    const email = localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail')
    if (email) {
      this.userStatsService.getUserAndStatsByEmail(email).subscribe({
        next: (userWithStatsDto) => {
          this.userWithStatsDto = userWithStatsDto
          this.userStats = userWithStatsDto.userStats
          this.userStats.user_id = { id: userWithStatsDto.id }
          console.log("Usuario profile: ", this.userWithStatsDto);

          if (userWithStatsDto.userStats.profile_image !== null) {
            this.avatarUrl = 'data:image/jpeg;base64,' + userWithStatsDto.userStats.profile_image;
          }
        },
        error: (err) => {
          console.error('Error cargando usuario', err)
        }
      });
    }
  }

  deleteAccount(): void {
    if (confirm('¿Seguro que deseas borrar la cuenta?')) {
      if (confirm('Esto eliminará todos tus datos permanentemente. Confirmarlo.')) {
        alert('Cuenta eliminada.');
      }
    }
  }

  userWithStatsDto: UserWithStatsDto | null = null;

  constructor(private userStatsService: UserStatsService) { }

  ngOnInit(): void {
    document.body.classList.add('profile-body');
    const email = localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail')
    if (email) {
      this.userStatsService.getUserAndStatsByEmail(email).subscribe({
        next: (userWithStatsDto) => {
          this.userWithStatsDto = userWithStatsDto
          this.userStats = userWithStatsDto.userStats
          this.userStats.user_id = { id: userWithStatsDto.id }
          console.log("Usuario profile: ", this.userWithStatsDto);

          if (userWithStatsDto.userStats.profile_image !== null) {
            this.avatarUrl = 'data:image/jpeg;base64,' + userWithStatsDto.userStats.profile_image;
          }
        },
        error: (err) => {
          console.error('Error cargando usuario', err)
        }
      });
    }
  }

  ngOnDestroy(): void {
    document.body.classList.remove('profile-body');
  }
}
