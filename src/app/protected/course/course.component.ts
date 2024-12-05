import { AfterViewInit, Component, HostBinding } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Course } from '@interfaces/general.interfaces';
import { HomeService } from '@services/home.service';
import { Location } from '@angular/common';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'ng-course',
  standalone: false,

  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
})
export class CourseComponent implements AfterViewInit {
  summary = '';
  translated = '';

  sIndex = 0;
  @HostBinding('class') class: string = 'section--dark';
  course: Course | undefined;

  constructor(
    private homeService: HomeService,
    public dom: DomSanitizer,
    private loc: Location,
    private authService: AuthService
  ) {}
  ngAfterViewInit(): void {
    this.homeService.courseSubject.subscribe((course) => {
      this.course = course;
      console.log(course);
    });
  }

  transcribe() {
    const user = this.homeService.user;

    this.homeService.transcript({ name: user!.name, url: this.course!.url! }).subscribe({
      next: (response) => {
        this.summary = response[0]
        this.translated = response[1]
      },
      error: (error) => {
        console.error('Request failed', error);
        alert('Request failed. Please try again.');
      },
    });
  }

  courseCompleted() {
    const user = this.homeService.user;

    this.homeService.courseCompleted({ name: user!.name, title: this.course!.title! }).subscribe({
      next: (response) => {
        this.loc.back();
      },
      error: (error) => {
        console.error('Request failed', error);
        alert('Request failed. Please try again.');
      },
    });
  }

  back() {
    this.loc.back();
  }
}
