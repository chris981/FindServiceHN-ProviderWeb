import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderStatusMantainanceComponent } from './order-status-mantainance/order-status-mantainance.component';
import { UserMantainanceComponent } from './user-mantainance/user-mantainance.component';

const routes: Routes = [
  {
    path: 'userMantainance',
    component: UserMantainanceComponent
  },
  {
    path: 'orderStatus',
    component: OrderStatusMantainanceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
