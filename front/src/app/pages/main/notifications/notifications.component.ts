import { Component } from '@angular/core';
import { MainComponent } from '../../../layouts/main/main.component';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [MainComponent],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {

}
