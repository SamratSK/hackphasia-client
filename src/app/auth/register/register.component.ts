import { Component, HostBinding } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'ng-register',
  standalone: false,

  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  @HostBinding('class') class: string = 'section--dark';

  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [Validators.required, Validators.pattern('^\\+?\\d{10,12}$')],
      ],
      age: [18, [Validators.required, Validators.min(10), Validators.max(100)]],
      gender: [true, Validators.required],
      preferredLanguage: ['English', Validators.required],
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;
      console.log('Form Data:', formData);

      this.authService
        .register({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          age: formData.age,
          gender: formData.gender,
          preferredLanguage: formData.preferredLanguage,
        })
        .subscribe({
          next: (response) => {
            console.log('Registration successful', response);
            alert('Registration successful!');
          },
          error: (error) => {
            console.error('Registration failed', error);
            alert('Registration failed. Please try again.');
          },
        });
    }
  }
}
