import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-kitchen',
  imports: [CommonModule, RouterModule],
  templateUrl: './kitchen.html',
  styleUrl: './kitchen.css'
})
export class Kitchen {
  ngOnInit(): void {
    document.body.classList.add('kitchen-body');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('kitchen-body');
  }
}
