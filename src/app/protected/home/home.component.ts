import { AfterViewInit, Component, HostBinding } from '@angular/core';
import { User } from '@interfaces/auth.interface';
import { Badge, MainCourse, MicroCourse } from '@interfaces/general.interfaces';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'ng-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements AfterViewInit {
  user: User | null = null;
  random: number = 0;
  @HostBinding('class') class: string = 'section--dark';

  microCourses: MicroCourse[] = [];
  mainCourses: MainCourse[] = [];
  badges: Badge[] = [];

  constructor(private authService: AuthService) {}
  ngAfterViewInit(): void {
    for (let index = 0; index < 10; index++) {
      this.microCourses.push({
        title: `Course ${index + 1}`,
        description: `This course ${index + 1} is very useful to peopleThis course ${index + 1} is very useful to peopleThis course ${index + 1} is very useful to peopleThis course ${index + 1} is very useful to peopleThis course ${index + 1} is very useful to peopleThis course ${index + 1} is very useful to people`,
        dateUploaded: new Date()
      });
    }
    for (let index = 0; index < 10; index++) {
      this.mainCourses.push({
        title: `Course ${index + 1}`,
        description: `This course ${index + 1} is very useful to people`,
        dateUploaded: new Date()
      });
    }
    for (let index = 0; index < 10; index++) {
      this.badges.push({
        courseName: `Course ${index + 1}`,
        score: Math.random(),
        date: new Date()
      });
    }

    this.random = Math.random();
    this.user = this.authService.getUser();
    this.authService.authChanged.subscribe(
      () => (this.user = this.authService.getUser())
    );
  }
}
