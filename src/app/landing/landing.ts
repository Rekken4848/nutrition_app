import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing',
  imports: [CommonModule, RouterModule],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class Landing {
  ngOnInit(): void {
    document.body.classList.add('landing-body');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('landing-body');
  }
}
