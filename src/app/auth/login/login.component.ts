import { Component, HostBinding } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'ng-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @HostBinding('class') class: string = 'section--dark';

  signInForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.signInForm.valid) {
      const formData = this.signInForm.value;
      
      this.authService.login({
        email: formData.email,
        password: formData.password
      }).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          alert('Sign-in successful!');
        },
        error: (error) => {
          console.error('Login failed', error);
          alert('Sign-in failed. Please check your credentials.');
        }
      });
    }
  }
}

