import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { User } from "./user/user";
import { Footer } from "./footer/footer";
import { Header } from "./header/header";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, User, Footer, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  city = 'Madrid';
}
