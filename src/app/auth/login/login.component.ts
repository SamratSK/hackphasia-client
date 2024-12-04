import { Component, HostBinding } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'ng-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  @HostBinding('class') class: string = 'section--dark';

  signInForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.signInForm.valid) {
      const formData = this.signInForm.value;

      this.authService
        .login({
          email: formData.email,
          password: formData.password,
        })
        .subscribe({
          next: (response) => {
            console.log(response)
            console.log('Login successful', response.message);
            alert(response.message);
            this.authService.loadUser({
              name: response.name,
              email: '',
              phone: '',
              age: 0,
              streak: 0,
              gender: true,
            });
            this.router.navigate(['/protected/home']);
          },
          error: (error) => {
            console.error('Login failed', error);
            alert('Sign-in failed. Please check your credentials.');
          },
        });
    }
  }
}
