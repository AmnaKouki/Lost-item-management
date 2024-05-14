import { Component, inject } from '@angular/core';
import { NgIf, NgFor, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainComponent } from '../../../layouts/main/main.component';
import { AuthService } from '../../../services/auth.service';
import { ItemsService } from '../../../services/items.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, NgFor, RouterModule, MainComponent, DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  authService = inject(AuthService);
  itemsService = inject(ItemsService);
  currentUser: any;
  getMyInfo() {
    this.authService.myInfo().subscribe({
      next: (response: any) => {
        this.currentUser = response;
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
  ngOnInit() {
    this.getMyInfo();
    this.getStats();
  }
  activeItems = 0;
  lostItems = 0;
  foundItems = 0;
  totalItems = 0;

  getStats() {
    this.itemsService.getStats().subscribe({
      next: (response: any) => {
        response.forEach((item: any) => {
          if (item.status === 'Active') {
            this.activeItems = item.count;
          } else if (item.status === 'Lost') {
            this.lostItems = item.count;
          } else if (item.status === 'Found') {
            this.foundItems = item.count;
          }
        });
        this.totalItems = this.activeItems + this.lostItems + this.foundItems;
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
}
