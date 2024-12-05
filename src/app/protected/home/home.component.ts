import { AfterViewInit, Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@interfaces/auth.interface';
import {
  Badge,
  Course,
  MainCourse,
  MicroCourse,
} from '@interfaces/general.interfaces';
import { AuthService } from '@services/auth.service';
import { HomeService } from '@services/home.service';

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

  constructor(
    private authService: AuthService,
    private homeService: HomeService,
    private router: Router
  ) {}
  ngAfterViewInit(): void {
    this.user = this.authService.getUser();
    this.authService.authChanged.subscribe(
      () => (this.user = this.authService.getUser())
    );

    this.homeService.home({ name: this.user!.name }).subscribe({
      next: (response) => {
        this.authService.loadUser({...response.user, streak: response['streak']});

        this.microCourses = response.courses
          .slice(0, response.courses.length / 2)
          .map((c) => {
            const nC: MicroCourse = {
              title: c['title'],
              description: c['description'],
              dateUploaded: new Date(c['date_uploaded']),
              url: c['url'],
            };
            
            return nC;
          });
          
          this.mainCourses = response.courses
          .slice(response.courses.length / 2)
          .map((c) => {
            const nC: MainCourse = {
              title: c['title'],
              description: c['description'],
              dateUploaded: new Date(c['date_uploaded']),
              url: c['url'],
            };

            return nC;
          });
      },
      error: (error) => {
        console.error('Request failed', error);
        alert('Request failed. Please try again.');
      },
    });

    for (let index = 0; index < 10; index++) {
      this.badges.push({
        courseName: `Course ${index + 1}`,
        score: 10,
        date: new Date(),
      })
      
    }
  }

  leaderboard() {
    this.router.navigate(['/protected/leaderboard'])
  }

  open(course: Course) {
    this.homeService.user = this.user;
    this.homeService.setCourse(course);
    this.router.navigate(['/protected/course']);
  }
}
