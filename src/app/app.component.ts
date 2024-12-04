import { AfterViewChecked, Component } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { HomeService } from '@services/home.service';

@Component({
  selector: 'ng-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewChecked{
  title = 'client';

  constructor(private authService: AuthService, private homeService: HomeService) {}
  ngAfterViewChecked(): void {
    this.homeService.setCourse({
      title: "SOME IMPORTANT COURSE",
      description: "randomrandomrandomrandomrandomrandomrandomrandomrandomrandomrandomrandomrandomrandomrandomrandomrandomrandomrandom",
      dateUploaded: new Date()
    })
    this.authService.loadUser({
      name: "John Doe",
      email: "a@b.com",
      phone: "9876543210",
      age: 18,
      streak: 10,
      gender: true
    });
  }
}
