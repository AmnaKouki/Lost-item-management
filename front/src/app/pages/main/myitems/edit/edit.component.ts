import { Component, inject } from '@angular/core';
import { MainComponent } from '../../../../layouts/main/main.component';
import { Location, NgClass, NgIf } from '@angular/common';
import { Item } from '../../../../types/Item';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from '../../../../services/items.service';
import { environment } from '../../../../../environments/environment';
@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [MainComponent, ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent {
  location = inject(Location);
  itemService = inject(ItemsService);
  activatedRoute = inject(ActivatedRoute);
  environment = environment;
  imageUrl = '';
  editForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    category: new FormControl(''),
    image: new FormControl(),
    status: new FormControl(''),
  });

  item!: Item;

  ngOnInit() {
    let itemId = this.activatedRoute.snapshot.params['id'];
    this.itemService.getOne(itemId).subscribe({
      next: (response: any) => {
        this.item = response;
        this.editForm.setValue({
          name: this.item.name,
          description: this.item.description,
          category: this.item.category,
          image: this.item.image,
          status: this.item.status,
        });
        //this.imageUrl = this.item.image;
      },
      error: (error) => {},
    });

    // this.editForm.setValue({
    //   name: this.item.name,
    //   description: this.item.description,
    //   category: this.item.category,
    //   image: this.item.image,
    //   status: this.item.status,
    // });
  }

  updateItem(event: Event) {
    let itemId = this.activatedRoute.snapshot.params['id'];
    let formData = new FormData();

    formData.append('name', this.editForm.value.name as string);
    formData.append('description', this.editForm.value.description as string);
    formData.append('category', this.editForm.value.category as string);
    formData.append('image', this.editForm.value.image as string);

    console.log(this.editForm.value);

    this.itemService.update(itemId, formData).subscribe({
      next: (response: any) => {
        this.location.back();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  resetForm(event: Event) {
    this.editForm.reset();
  }
  cancel() {
    this.location.back();
  }

  onDrop(event: DragEvent) {
    this.isDragging = false;
    event.preventDefault();
    // if we got a file
    let image = event.dataTransfer?.files[0];
    // check if it's an image
    if (image?.type.match('image.*')) {
      this.editForm.patchValue({ image });
      this.imageUrl = URL.createObjectURL(image);
    }
  }
  isDragging = false;
  onDragOver(event: DragEvent) {
    this.isDragging = true;
    event.stopPropagation();
    event.preventDefault();
  }

  onImagePicked(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      this.editForm.patchValue({ image: file });
      this.imageUrl = URL.createObjectURL(file);
    }
  }

  hostname = "http://" + window.location.hostname
}
