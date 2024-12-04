import {
  AfterContentChecked,
  AfterViewInit,
  Component,
  HostBinding,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'ng-header',
  standalone: false,

  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements AfterContentChecked {
  currentRoute: string | undefined = undefined;
  isAuthenticated: boolean = false;
  @HostBinding('class') class: string = 'section--dark';

  constructor(private router: Router, private authService: AuthService) {}

  ngAfterContentChecked(): void {
    this.currentRoute = this.router.url;

    this.isAuthenticated = this.authService.isAuthenticated();
    this.authService.authChanged.subscribe(
      () => {
        this.isAuthenticated = this.authService.isAuthenticated();
      }
    );
  }
}
