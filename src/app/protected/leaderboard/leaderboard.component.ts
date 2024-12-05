import { Component, HostBinding } from '@angular/core';
import { HomeService } from '@services/home.service';

type Item = {
  score: number;
  name: string;
  badgeCount: number;
  certificateCount: number;
  streaks: number;
  phoneNo: string;
}
@Component({
  selector: 'ng-leaderboard',
  standalone: false,
  
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.scss'
})
export class LeaderboardComponent {
  @HostBinding('class') class: string = 'section--dark';
  items: Item[] = [];

  constructor(private homeService: HomeService) {
    homeService.leaderboard().subscribe({
      next: (response: any[]) => {
        response.forEach((r) => {

          this.items.push({
            score: r['score'],
            name: r['name'],
            badgeCount: r['badges_count'],
            certificateCount: r['certificates_count'],
            streaks: r['streaks'],
            phoneNo: r['phone_no'],
          })
        })
      },
      error(err) {
        console.error('Request failed', err);
        alert('Request failed. Please try again.');
      },
    })
  }
}
