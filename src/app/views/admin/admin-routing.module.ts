import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesMantainanceComponent } from './categories-maintenance/categories-mantainance.component';
import { CountriesMaintenanceComponent } from './countries-maintenance/countries-maintenance.component';
import { CustomersAddressesMaintenanceComponent } from './customers-addresses-maintenance/customers-addresses-maintenance.component';
import { CustomersMaintenanceComponent } from './customers-maintenance/customers-maintenance.component';
import { DayhoursMantainanceComponent } from './dayhours-maintenance/dayhours-mantainance.component';
import { DepartmentsMaintenanceComponent } from './departments-maintenance/departments-maintenance.component';
import { MunicipalitiesMaintenanceComponent } from './municipalities-maintenance/municipalities-maintenance.component';
import { OrderStatusMantainanceComponent } from './order-status-maintenance/order-status-mantainance.component';
import { OrdersDetailComponent } from './orders-detail-maintenance/orders-detail.component';
import { OrdersHeaderComponent } from './orders-header-maintenance/orders-header.component';
import { OrdersSatisfactionComponent } from './orders-satisfaction-maintenance/orders-satisfaction.component';
import { ProductMantainanceComponent } from './product-maintenance/product-mantainance.component';
import { ProviderMantainanceComponent } from './provider-maintenance/provider-mantainance.component';
import { ProviderPlansJobsMantainanceComponent } from './provider-plans-jobs-maintenance/provider-plans-jobs-mantainance.component';
import { ProviderServiceMantainanceComponent } from './provider-service-maintenance/provider-service-mantainance.component';
import { ProvidersAttentionComponent } from './providers-attention-maintenance/providers-attention.component';
import { ProvidersEvalComponent } from './providers-eval-maintenance/providers-eval.component';
import { QuotesDetailComponent } from './quotes-detail-maintenance/quotes-detail.component';
import { QuotesHeaderComponent } from './quotes-header-maintenance/quotes-header.component';
import { ServiceStatusMantainanceComponent } from './service-status-maintenance/service-status-mantainance.component';
import { SubcategoriesMantainanceComponent } from './subcategories-maintenance/subcategories-mantainance.component';
import { UserMantainanceComponent } from './user-maintenance/user-mantainance.component';

const routes: Routes = [
  {
    path: 'user-maintenance',
    component: UserMantainanceComponent
  },
  {
    path: 'order-status',
    component: OrderStatusMantainanceComponent
  },
  {
    path: 'products',
    component: ProductMantainanceComponent
  },
  {
    path: 'providers',
    component: ProviderMantainanceComponent
  },
  {
    path: 'providers-service',
    component: ProviderServiceMantainanceComponent
  },
  {
    path: 'providers-plan-jobs',
    component: ProviderPlansJobsMantainanceComponent
  },
  {
    path: 'providers-eval',
    component: ProvidersEvalComponent
  },
  {
    path: 'service-status',
    component: ServiceStatusMantainanceComponent
  },
  {
    path: 'quotes-header',
    component: QuotesHeaderComponent
  },
  {
    path: 'quotes-detail',
    component: QuotesDetailComponent
  },
  {
    path: 'providers-attention',
    component: ProvidersAttentionComponent
  },
  {
    path: 'categories',
    component: CategoriesMantainanceComponent
  },
  {
    path: 'subcategories',
    component: SubcategoriesMantainanceComponent
  },
  {
    path: 'dayhours',
    component: DayhoursMantainanceComponent
  },
  {
    path: 'order-header',
    component: OrdersHeaderComponent
  },
  {
    path: 'order-detail',
    component: OrdersDetailComponent
  },
  {
    path: 'order-satisfaction',
    component: OrdersSatisfactionComponent
  },
  {
    path: 'customers',
    component: CustomersMaintenanceComponent
  },
  {
    path: 'customers-addresses',
    component: CustomersAddressesMaintenanceComponent
  },
  {
    path: 'countries',
    component: CountriesMaintenanceComponent
  },
  {
    path: 'departments',
    component: DepartmentsMaintenanceComponent
  },
  {
    path: 'municipalities',
    component: MunicipalitiesMaintenanceComponent
  }
    

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
