import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './myitems/list/list.component';
import { EditComponent } from './myitems/edit/edit.component';
import { AddComponent } from './myitems/add/add.component';
import { InfoComponent } from './myitems/info/info.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { DeliveryComponent } from './delivery/delivery.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home',
  },
  {
    path: 'my-items',
    title: 'My Items',
    children: [
      {
        path: '',
        component: ListComponent,
        title: 'My Items',
      },
      {
        path: 'edit/:id',
        component: EditComponent,
        title: 'Edit Item',
      },
      {
        path: 'add',
        component: AddComponent,
        title: 'Add New Item',
      },
      {
        path: 'info/:id',
        component: InfoComponent,
        title: "Item's Details",
      },
    ],
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
    title: 'Notifications',
  },
  {
    path: 'delivery', 
    component: DeliveryComponent,
    title: 'Delivery',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
