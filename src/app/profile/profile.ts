import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

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
    alert('Aquí cambiaría tu avatar');
  }

  saveProfile(e: Event): void {
    const btn = e.target as HTMLButtonElement;
    const original = btn.textContent;
    btn.textContent = 'Saving...';
    btn.disabled = true;
    setTimeout(() => {
      alert('Perfil guardado correctamente 😊');
      btn.textContent = original;
      btn.disabled = false;
    }, 1500);
  }

  resetForm(): void {
    if (confirm('¿Resetear valores al estado original?')) {
      this.user = {
        firstName: 'John', lastName: 'Doe',
        email: 'john.doe@email.com',
        age: 28, gender: 'male', height: 175, weight: 70,
        activityLevel: 'light'
      };
    }
  }

  deleteAccount(): void {
    if (confirm('¿Seguro que deseas borrar la cuenta?')) {
      if (confirm('Esto eliminará todos tus datos permanentemente. Confirmarlo.')) {
        alert('Cuenta eliminada.');
      }
    }
  }

  ngOnInit(): void {
    document.body.classList.add('profile-body');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('profile-body');
  }
}
