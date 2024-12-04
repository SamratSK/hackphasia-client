import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'ng-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  @HostBinding('class') class: string = 'section--dark';
}
