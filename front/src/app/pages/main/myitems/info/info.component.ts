import { Component, inject } from '@angular/core';
import { MainComponent } from '../../../../layouts/main/main.component';
import type { Item } from '../../../../types/Item';
import { DatePipe, Location } from '@angular/common';
import { ItemsService } from '../../../../services/items.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { QRCodeModule } from 'angularx-qrcode';
@Component({
  selector: 'app-info',
  standalone: true,
  imports: [MainComponent, DatePipe, QRCodeModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css',
})
export class InfoComponent {
  environment = environment;
  location = inject(Location);
  itemService = inject(ItemsService);
  item!: Item;
  private activatedRoute = inject(ActivatedRoute);
  ngOnInit() {
    // get id from the route
    let itemId = this.activatedRoute.snapshot.params['id'];
    this.itemService.getOne(itemId).subscribe({
      next: (item: any) => {
        this.item = item;
        this.qrString =  "http://" + window.location.host + '/qr/' + item.uuid;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  cancel() {
    this.location.back();
  }

  hostname = 'http://' + window.location.hostname;
  qrString = '';

  openQRLink(){
    window.open(this.qrString, '_blank');
  }
}
