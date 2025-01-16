import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: [false] // Optional remember me checkbox
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.authService.login(username, password).subscribe({
        next: (response) => {
          if (response && response.accessToken) {
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('username', response.username);
            localStorage.setItem('roles', JSON.stringify(response.roles));

            // Redirect based on the user's role
            if (response.roles.includes('ROLE_ADMIN')) {
              this.route.navigate(['/admindashboard']); // Redirect to admin dashboard
            } else if (response.roles.includes('ROLE_CUSTOMER')) {
              this.route.navigate(['/customerdashboard']); // Redirect to home for non-admins
            }
            else{
              this.route.navigate(['/home']);
            }
          }
        },
        error: (error) => {
          console.error('Login failed', error);
          this.errorMessage = 'Invalid username or password.';
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  register() {
    this.route.navigate(['/register']);
  }
}
