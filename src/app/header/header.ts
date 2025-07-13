import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  isLoggedIn: boolean = false;

  constructor(private router: Router) {
    //const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    //this.isLoggedIn = !!token;
  }

  checkLogin() {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    this.isLoggedIn = !!token;
  }

  logout() {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    sessionStorage.removeItem('userEmail');
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    this.isLoggedIn = !!token;
    this.router.navigate(['/login']);
  }

  toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks?.classList.toggle('active');
  }

  ngOnInit() {
    this.checkLogin();
    setInterval(() => this.checkLogin(), 3000); // cada 3s
  }
}
