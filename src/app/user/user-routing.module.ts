import { AuthGaurdService } from './../auth/auth-gaurd.service'
import { LogoutComponent } from './logout/logout.component'
import { ProfileComponent } from './profile/profile.component'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGaurdService] },
  { path: 'logout', component: LogoutComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
