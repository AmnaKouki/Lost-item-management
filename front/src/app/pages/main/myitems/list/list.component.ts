import { Component, inject } from '@angular/core';
import { MainComponent } from '../../../../layouts/main/main.component';
import { Router, RouterModule } from '@angular/router';
import { NgForOf, SlicePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TooltipModule } from 'primeng/tooltip';
import type { Item } from '../../../../types/Item';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthService } from '../../../../services/auth.service';
import { ItemsService } from '../../../../services/items.service';
import { environment } from '../../../../../environments/environment';
import { HotToastService } from '@ngneat/hot-toast';
import { DialogModule } from 'primeng/dialog';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    MainComponent,
    RouterModule,
    NgForOf,
    TableModule,
    IconFieldModule,
    InputIconModule,
    TooltipModule,
    ConfirmDialogModule,
    SlicePipe,
    HttpClientModule,
    DialogModule,
    SelectButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  providers: [ConfirmationService, AuthService, HttpClient],
})
export class ListComponent {
  environment = environment;
  router = inject(Router);
  itemsService = inject(ItemsService);
  confirmationService = inject(ConfirmationService);
  items: Item[] = [];
  toast = inject(HotToastService);
  isStatusModalVisible = false;

  ngOnInit() {
    this.statusForm = new FormGroup({
      value: new FormControl(''),
    });

    this.itemsService.getMyItems().subscribe({
      next: (response: any) => {
        this.items = response;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  openDetailsPage(id: string) {
    this.router.navigate([`/app/my-items/info/${id}`]);
  }
  openEditPage(id: string) {
    this.router.navigate([`/app/my-items/edit/${id}`]);
  }

  openDeleteDialog(id: string, event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.itemsService.delete(id).subscribe({
          next: (response: any) => {
            this.toast.success('Item deleted successfully');
            this.ngOnInit();
          },
          error: (error: any) => {
            console.log(error);
          },
        });
      },
      reject: () => {
        // TODO
      },
    });
  }

  statusForm!: FormGroup;

  statusOptions: any[] = [
    { label: 'Active', value: 'Active' },
    { label: 'Lost', value: 'Lost' },
    { label: 'Found', value: 'Found' },
  ];

  selectedItemId: any;
  selectedTmpStatus: any;

  updateItemStatus() {
    let selectedItemId = this.selectedItemId;
    this.itemsService
      .updateStatus(selectedItemId, {
        status: this.statusForm.get('value')?.value,
      })
      .subscribe({
        next: (response: any) => {
          this.toast.success('Item status updated successfully');
          this.isStatusModalVisible = false;
          this.ngOnInit();
        },
        error: (error: any) => {},
      });
  }

  openUpdateStatusModal(id: any, status: any) {
    this.selectedItemId = id;
    this.selectedTmpStatus = status;
    this.statusForm.patchValue({ value: status });
    this.isStatusModalVisible = true;
  }

  hostname = "http://" + window.location.hostname
}
