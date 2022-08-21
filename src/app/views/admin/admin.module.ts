import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxPaginationModule } from 'ngx-pagination';

import { AdminRoutingModule } from './admin-routing.module';
import { UserMantainanceComponent } from './user-mantainance/user-mantainance.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderStatusMantainanceComponent } from './order-status-mantainance/order-status-mantainance.component';


@NgModule({
  declarations: [
    UserMantainanceComponent,
    OrderStatusMantainanceComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxDatatableModule,
    NgbModule,
  ]
})
export class AdminModule { }
