import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth-service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user-service';
import { User } from '../../models/user.model';
import { UserStatsService } from '../../services/user-stats-service';
import { UserStats } from '../../models/user-stats.model';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  /*loginForm: FormGroup;
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
  }*/

  loginForm: FormGroup;
  loading = false;
  registerForm: FormGroup;

  isLogin = true;
  showLoginPassword = false;
  loginData = { email: '', password: '', rememberMe: false };

  /*registerData = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  };*/

  registerData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: null,
    gender: '',
    height: null,
    weight: null,
    activityLevel: '',
    agreeTerms: false
  };

  showRegisterPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private fb2: FormBuilder,
    private userService: UserService,
    private userStatsService: UserStatsService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
    this.registerForm = this.fb2.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(13), Validators.max(120)]],
      gender: ['', Validators.required],
      height: ['', [Validators.required, Validators.min(100), Validators.max(250)]],
      weight: ['', [Validators.required, Validators.min(30), Validators.max(300)]],
      activityLevel: ['', Validators.required],
      agreeTerms: [false, Validators.requiredTrue]
    });
  }

  submit() {
    console.log("Formulario enviado")
    if (this.loginForm.invalid) return;

    console.log("Valido")

    this.loading = true;
    const { email, password } = this.loginForm.value;
    const credentials: string = email;

    this.authService.login(credentials, password).subscribe({
      next: (res) => {
        console.log('Login correcto', res);
        localStorage.setItem('authToken', res.token);
        localStorage.setItem('userEmail', res.user.email);
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        console.log('Login incorrecto', err);
        alert('Login failed: ' + err.error.message || 'Unknown error');
        this.loading = false;
      }
    });
  }

  submitRegister() {
    console.log("Formulario register enviado");
    if (this.registerForm.invalid) return;

    console.log("Register Valido");

    const {
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword,
      age,
      gender,
      height,
      weight,
      activityLevel
    } = this.registerForm.value;

    let fat_percentage: number;

    console.log(gender)
    if (gender === 'male') {
      const IBM: number = weight / (height * height);
      fat_percentage = (1.2 * IBM) + (0.23 * age) - (10.8 * 1);
    } else if (gender === 'female') {
      const IBM: number = weight / (height * height);
      fat_percentage = (1.2 * IBM) + (0.23 * age) - (10.8 * 0);
    } else {
      const IBM: number = weight / (height * height);
      fat_percentage = (1.2 * IBM) + (0.23 * age) - (10.8 * 1.5);
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    this.loading = true;

    const last_name: string = lastName

    const userToCreate: User = {
      email,
      username,
      password,
      name: firstName,
      last_name
    };

    this.userService.createUser(userToCreate).subscribe({
      next: (res) => {
        console.log('Usuario creado correctamente', res);

        const credentials: string = res.email;
        this.authService.login(credentials, password).subscribe({
          next: (secondres) => {
            console.log('Usuario encontrado por email correctamente', secondres);

            if (secondres.user.id === undefined) {
              console.log('No existe el id del usuario')
              return;
            }

            const userStatsToCreate: UserStats = {
              user_id: { id: secondres.user.id },
              age,
              gender,
              height,
              weight,
              activity_level: activityLevel,
              fat_percentage
            }

            console.log(userStatsToCreate)

            localStorage.setItem('authToken', secondres.token);
            localStorage.setItem('userEmail', secondres.user.email);

            this.userStatsService.createUserStats(userStatsToCreate).subscribe({
              next: (finalres) => {
                console.log('Usuario Stats creado correctamente', finalres);
                this.router.navigate(['/dashboard']);
              },
              error: err => {
                console.error('Error al crear usuario stats', err);
                alert('Registration failed: ' + (err.error?.message || 'Unknown error'));
                this.loading = false;
              }
            });
          },
          error: err => {
            console.error('Error al buscar usuario despues de crear usuario', err);
            alert('Registration failed: ' + (err.error?.message || 'Unknown error'));
            this.loading = false;
          }
        });
      },
      error: err => {
        console.error('Error al crear usuario', err);
        alert('Registration failed: ' + (err.error?.message || 'Unknown error'));
        this.loading = false;
      }
    });
  }

  showLogin() {
    this.isLogin = true;
  }

  showRegister() {
    this.isLogin = false;
  }

  togglePassword(field: 'login' | 'register' | 'confirm') {
    if (field === 'login') this.showLoginPassword = !this.showLoginPassword;
  }

  handleLogin() {
    alert(`🔐 Login Attempt: Email: ${this.loginData.email} Remember Me: ${this.loginData.rememberMe ? 'Sí' : 'No'} Redirecting to dashboard...`);
    // Aquí podrías llamar a un service real
  }

  handleRegister() {
    if (this.registerData.password !== this.registerData.confirmPassword) {
      alert("❌ Passwords do not match.");
      return;
    }

    if (!this.registerData.agreeTerms) {
      alert("❌ You must agree to the Terms of Service.");
      return;
    }

    console.log("✅ Registration Data:", this.registerData);
    alert(`🎉 Account for ${this.registerData.firstName} created successfully!`);
  }

  forgotPassword(event: Event) {
    event.preventDefault();
    alert('📧 Password reset link will be sent to your email address.');
  }

  socialLogin(provider: string, event: Event) {
    event.preventDefault();
    alert(`🔗 Redirecting to ${provider} login...`);
  }

  ngOnInit(): void {
    document.body.classList.add('login-body');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('login-body');
  }
}