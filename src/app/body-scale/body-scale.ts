import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-body-scale',
  imports: [CommonModule],
  templateUrl: './body-scale.html',
  styleUrl: './body-scale.css'
})
export class BodyScale {
  takeMeasurement() {
    const currentWeightElement = document.getElementById('currentWeight');
    if (!currentWeightElement) return;

    const currentWeight = parseFloat(currentWeightElement.textContent || '0');

    const variation = (Math.random() - 0.5) * 0.4;
    const newWeight = Math.max(50, Math.min(100, currentWeight + variation));

    let steps = 20;
    let stepSize = (newWeight - currentWeight) / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const displayWeight = currentWeight + (stepSize * currentStep);
      if (currentWeightElement) {
        currentWeightElement.textContent = displayWeight.toFixed(1);
      }

      if (currentStep >= steps) {
        clearInterval(interval);
        currentWeightElement!.textContent = newWeight.toFixed(1);

        const lastMeasurement = document.querySelector('.last-measurement');
        if (lastMeasurement) {
          lastMeasurement.textContent = 'Last measured: Just now';
        }

        alert(`✅ New measurement recorded: ${newWeight.toFixed(1)} kg\n\nData synced to your health profile!\n\n📊 Updated stats:\n• BMI calculated\n• Body composition analyzed\n• Progress tracked`);
      }
    }, 50);
  }

  updateStats() {
    console.log('Updating stats from IoT device...');
  }

  ngOnInit(): void {
    document.body.classList.add('body-scale-body');
    const cards = document.querySelectorAll('.stat-card, .goal-card');
    cards.forEach((card, index) => {
      (card as HTMLElement).style.opacity = '0';
      (card as HTMLElement).style.transform = 'translateY(30px)';
      setTimeout(() => {
        (card as HTMLElement).style.transition = 'all 0.8s ease';
        (card as HTMLElement).style.opacity = '1';
        (card as HTMLElement).style.transform = 'translateY(0)';
      }, index * 150);
    });
    setInterval(this.updateStats, 30000);
  }

  ngOnDestroy(): void {
    document.body.classList.remove('body-scale-body');
  }
}
