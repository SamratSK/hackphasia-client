import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'ng-footer',
  standalone: false,
  
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  @HostBinding('class') class: string = 'section--dark';
}

