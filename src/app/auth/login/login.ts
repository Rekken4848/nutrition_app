import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth-service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  /*username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        console.log('Login correcto', res);
        // Aquí puedes guardar token o redirigir
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.errorMessage = 'Credenciales incorrectas';
      }
    });
  }*/

  loginForm: FormGroup;
  loading = false;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  submit() {
    console.log("Formulario enviado")
    if (this.loginForm.invalid) return;

    console.log("Valido")

    this.loading = true;
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (res) => {
        console.log('Login correcto', res);
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        console.log('Login incorrecto', err);
        alert('Login failed: ' + err.error.message || 'Unknown error');
        this.loading = false;
      }
    });
  }

  socialLogin(provider: 'Google' | 'Facebook'): void {
    alert(`${provider} login would be implemented here`);
  }

  ngOnInit(): void {
    document.body.classList.add('login-body');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('login-body');
  }
}