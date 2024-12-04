import { AfterViewInit, Component, HostBinding } from '@angular/core';
import { Course } from '@interfaces/general.interfaces';
import { HomeService } from '@services/home.service';

@Component({
  selector: 'ng-course',
  standalone: false,

  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
})
export class CourseComponent implements AfterViewInit {
  @HostBinding('class') class: string = 'section--dark';
  course: Course | undefined;

  constructor(private homeService: HomeService) {}
  ngAfterViewInit(): void {
    this.homeService.courseSubject.subscribe((course) => {
      this.course = course;
    });
  }
}
