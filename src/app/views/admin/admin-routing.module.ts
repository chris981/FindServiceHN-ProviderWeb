import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserMantainanceComponent } from './user-mantainance/user-mantainance.component';

const routes: Routes = [
  {
    path: 'userMantainance',
    component: UserMantainanceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
