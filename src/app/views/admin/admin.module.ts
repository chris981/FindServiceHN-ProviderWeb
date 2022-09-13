import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserMantainanceComponent } from './user-maintenance/user-mantainance.component';
import { ProviderMantainanceComponent } from './provider-maintenance/provider-mantainance.component';
import { ProviderServiceMantainanceComponent } from './provider-service-maintenance/provider-service-mantainance.component';
import { ProviderPlansJobsMantainanceComponent } from './provider-plans-jobs-maintenance/provider-plans-jobs-mantainance.component';
import { ProvidersEvalComponent } from './providers-eval-maintenance/providers-eval.component';
import { ServiceStatusMantainanceComponent } from './service-status-maintenance/service-status-mantainance.component';
import { QuotesHeaderComponent } from './quotes-header-maintenance/quotes-header.component';
import { QuotesDetailComponent } from './quotes-detail-maintenance/quotes-detail.component';
import { DayhoursMantainanceComponent } from './dayhours-maintenance/dayhours-mantainance.component';
import { ProvidersAttentionComponent } from './providers-attention-maintenance/providers-attention.component';
import { CategoriesMantainanceComponent } from './categories-maintenance/categories-mantainance.component';
import { SubcategoriesMantainanceComponent } from './subcategories-maintenance/subcategories-mantainance.component';
import { ProductMantainanceComponent } from './product-maintenance/product-mantainance.component';
import { OrderStatusMantainanceComponent } from './order-status-maintenance/order-status-mantainance.component';
import { OrderHeaderMantainanceComponent } from './orders-header-maintenance/orders-header-mantainance.component';
import { OrderDetailMantainanceComponent } from './orders-detail-maintenance/orders-detail-mantainance.component';
import { OrderSatisfactionMantainanceComponent } from './orders-satisfaction-maintenance/orders-satisfaction-mantainance.component';
import { CustomersMaintenanceComponent } from './customers-maintenance/customers-maintenance.component';
import { CustomersAddressesMaintenanceComponent } from './customers-addresses-maintenance/customers-addresses-maintenance.component';
import { CountriesMaintenanceComponent } from './countries-maintenance/countries-maintenance.component';
import { DepartmentsMaintenanceComponent } from './departments-maintenance/departments-maintenance.component';
import { MunicipalitiesMaintenanceComponent } from './municipalities-maintenance/municipalities-maintenance.component';



@NgModule({
  declarations: [
    UserMantainanceComponent,
    ProviderMantainanceComponent,
    ProviderServiceMantainanceComponent,
    ProviderPlansJobsMantainanceComponent,
    ProvidersEvalComponent,
    ServiceStatusMantainanceComponent,
    QuotesHeaderComponent,
    QuotesDetailComponent,
    DayhoursMantainanceComponent,
    ProvidersAttentionComponent,
    CategoriesMantainanceComponent,
    SubcategoriesMantainanceComponent,
    ProductMantainanceComponent,
    OrderStatusMantainanceComponent,
    OrderHeaderMantainanceComponent,
    OrderDetailMantainanceComponent,
    OrderSatisfactionMantainanceComponent,
    CustomersMaintenanceComponent,
    CustomersAddressesMaintenanceComponent,
    CountriesMaintenanceComponent,
    DepartmentsMaintenanceComponent,
    MunicipalitiesMaintenanceComponent
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
