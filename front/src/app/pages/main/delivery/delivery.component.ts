import { Component } from '@angular/core';
import { MainComponent } from '../../../layouts/main/main.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-delivery',
  standalone: true,
  imports: [MainComponent, NgFor],
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.css',
})
export class DeliveryComponent {
  itemsToDeliver = [
    {
      name: 'Phone',
      from: 'Tunis, Tunisia',
      to: 'Bizerte, Tunisia',
      status: 'In Transit',
      color: 'yellow',
    },
    {
      name: 'Laptop',
      from: 'Sousse, Tunisia',
      to: 'Tunis, Tunisia',
      status: 'Delayed',
      color: 'red',
    },
    {
      name: 'Laptop',
      from: 'Sousse, Tunisia',
      to: 'Tunis, Tunisia',
      status: 'Delayed',
      color: 'red',
    }, {
      name: 'Laptop',
      from: 'Sousse, Tunisia',
      to: 'Tunis, Tunisia',
      status: 'Delayed',
      color: 'red',
    }, {
      name: 'Laptop',
      from: 'Sousse, Tunisia',
      to: 'Tunis, Tunisia',
      status: 'Delayed',
      color: 'red',
    }, {
      name: 'Laptop',
      from: 'Sousse, Tunisia',
      to: 'Tunis, Tunisia',
      status: 'Delayed',
      color: 'red',
    }, {
      name: 'Laptop',
      from: 'Sousse, Tunisia',
      to: 'Tunis, Tunisia',
      status: 'Delayed',
      color: 'red',
    }, {
      name: 'Laptop',
      from: 'Sousse, Tunisia',
      to: 'Tunis, Tunisia',
      status: 'Delayed',
      color: 'red',
    },
    {
      name: 'Tablet',
      from: 'Sfax, Tunisia',
      to: 'Tunis, Tunisia',
      status: 'In Transit',
      color: 'yellow',
    },
    {
      name: 'Headphones',
      from: 'Tunis, Tunisia',
      to: 'Sousse, Tunisia',
      status: 'Delayed',
      color: 'red',
    },
    {
      name: 'Keyboard',
      from: 'Bizerte, Tunisia',
      to: 'Sfax, Tunisia',
      status: 'In Transit',
      color: 'yellow',
    },
    {
      name: 'Wallet',
      from: 'Sousse, Tunisia',
      to: 'Bizerte, Tunisia',
      status: 'In Transit',
      color: 'yellow',
    },
    {
      name: 'Camera',
      from: 'Sfax, Tunisia',
      to: 'Sousse, Tunisia',
      status: 'Ready',
      color: 'green',
    },
  ];
}
