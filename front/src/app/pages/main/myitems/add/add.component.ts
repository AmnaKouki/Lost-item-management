import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { MainComponent } from '../../../../layouts/main/main.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Location, NgClass, NgIf } from '@angular/common';
import confetti from 'canvas-confetti';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import * as uuid from 'uuid';
import { QRCodeModule } from 'angularx-qrcode';
import { SafeUrl } from '@angular/platform-browser';
import { ItemsService } from '../../../../services/items.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    MainComponent,
    DialogModule,
    ButtonModule,
    ReactiveFormsModule,
    NgIf,
    NgClass,
    QRCodeModule,
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
})
export class AddComponent {
  visible: boolean = false;
  location = inject(Location);
  router = inject(Router);
  itemsService = inject(ItemsService);
  public qrCodeDownloadLink: SafeUrl = '';

  imageUrl = '';
  qrString = '';
  AddForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    category: new FormControl(''),
    image: new FormControl(),
  });

  saveItem(ev: Event) {
    ev.preventDefault();

    // multipart form data
    const formData = new FormData();
    // append the image to the form data
    formData.append('image', this.AddForm.get('image')!.value);
    // append the rest of the form data
    formData.append('name', this.AddForm.get('name')!.value as string);
    formData.append(
      'description',
      this.AddForm.get('description')!.value as string
    );
    formData.append('category', this.AddForm.get('category')!.value as string);
    this.itemsService.create(formData).subscribe({
      next: (response: any) => {
        this.qrString = "http://" + window.location.host + '/qr/' + response.uuid;
        this.visible = true;
        this.celebrate();
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  cancel() {
    this.location.back();
  }

  resetForm(ev: Event) {
    this.AddForm.reset();
    this.imageUrl = '';
  }

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

  onImagePicked(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      this.AddForm.patchValue({ image: file });
      this.imageUrl = URL.createObjectURL(file);
    }
  }

  hideDialog() {
    this.router.navigate(['/app/my-items']);
  }

  onDrop(event: DragEvent) {
    this.isDragging = false;
    event.preventDefault();
    // if we got a file
    let image = event.dataTransfer?.files[0];
    // check if it's an image
    if (image?.type.match('image.*')) {
      this.AddForm.patchValue({ image });
      this.imageUrl = URL.createObjectURL(image);
    }
  }
  isDragging = false;
  onDragOver(event: DragEvent) {
    this.isDragging = true;
    event.stopPropagation();
    event.preventDefault();
  }

  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }

  saveAsImage(parent: any) {
    let parentElement = null;

    // fetches base 64 data from canvas
    parentElement = parent.qrcElement.nativeElement
      .querySelector('canvas')
      .toDataURL('image/png');

    if (parentElement) {
      // converts base 64 encoded image to blobData
      let blobData = this.convertBase64ToBlob(parentElement);
      // saves as image
      const blob = new Blob([blobData], { type: 'image/png' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      // name of the file
      link.download = uuid.v4() + '.png';
      link.click();
    }
  }

  private convertBase64ToBlob(Base64Image: string) {
    // split into two parts
    const parts = Base64Image.split(';base64,');
    // hold the content type
    const imageType = parts[0].split(':')[1];
    // decode base64 string
    const decodedData = window.atob(parts[1]);
    // create unit8array of size same as row data length
    const uInt8Array = new Uint8Array(decodedData.length);
    // insert all character code into uint8array
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i);
    }
    // return blob image after conversion
    return new Blob([uInt8Array], { type: imageType });
  }

  printQRCode(parent: any) {
    let parentElement = null;
    parentElement = parent.qrcElement.nativeElement
      .querySelector('canvas')
      .toDataURL('image/png');
    if (parentElement) {
      let blobData = this.convertBase64ToBlob(parentElement);
      let blob = new Blob([blobData], { type: 'image/png' });
      let url = window.URL.createObjectURL(blob);
      let image = new Image();
      image.src = url;
      let w = window.open('');
      w!.document.write(image.outerHTML);
      // TODO: Add Item Name and Description to the print
      image.onload = function () {
        w!.print();
      };
    }
  }
}
