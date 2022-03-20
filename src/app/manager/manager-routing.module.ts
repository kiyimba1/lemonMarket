import { Role } from './../auth/auth.enum'
import { AuthGaurdService } from './../auth/auth-gaurd.service'
import { ManagerComponent } from './manager.component'
import { RecieptLookupComponent } from './reciept-lookup/reciept-lookup.component'
import { UserManagementComponent } from './user-management/user-management.component'
import { ManagerHomeComponent } from './manager-home/manager-home.component'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    component: ManagerComponent,
    children: [
      { path: '', redirectTo: '/manager/home', pathMatch: 'full' },
      {
        path: 'home',
        component: ManagerHomeComponent,
        canActivate: [AuthGaurdService],
        data: { expectedRole: Role.Manager },
      },
      {
        path: 'users',
        component: UserManagementComponent,
        canActivate: [AuthGaurdService],
        data: { expectedRole: Role.Manager },
      },
      {
        path: 'reciepts',
        component: RecieptLookupComponent,
        canActivate: [AuthGaurdService],
        data: { expectedRole: Role.Manager },
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule {}
