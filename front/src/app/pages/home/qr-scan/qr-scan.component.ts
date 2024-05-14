import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ItemsService } from '../../../services/items.service';
import { environment } from '../../../../environments/environment';
import confetti from 'canvas-confetti';
@Component({
  selector: 'app-qr-scan',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './qr-scan.component.html',
  styleUrl: './qr-scan.component.css',
})
export class QrScanComponent {
  activatedRoute = inject(ActivatedRoute);
  itemsService = inject(ItemsService);
  isItemFound = false;
  item: any;
  environment = environment;
  getItemByUUID(uuid: string) {
    this.itemsService.getItemByUUID(uuid).subscribe({
      next: (item) => {
        // item found
        this.isItemFound = true;
        this.item = item;
        this.celebrate();
      },
      error: (error) => {
        // item not found
        this.isItemFound = false;
      },
    });
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.getItemByUUID(params.uuid);
    });
  }

  hostname = 'http://' + window.location.hostname;

  celebrate() {
    const duration = 3000; // in milliseconds

    confetti({
      particleCount: 100,
      spread: 160,
      origin: { y: 0.6 },
      zIndex: 2000,
    });

    // Clear confetti after a certain duration
    setTimeout(() => confetti.reset(), duration);
  }
}
