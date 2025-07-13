import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Footer } from "./footer/footer";
import { Header } from "./header/header";
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  hideHeaderFooter = false;

  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.hideHeaderFooter = event.urlAfterRedirects.startsWith('/login');

      // Forzar que Angular detecte el cambio en el *ngIf
      this.cdr.detectChanges();
    });
  }
}
