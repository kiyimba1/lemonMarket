import { PosComponent } from './pos/pos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: PosComponent,
  children:
  [
  {path: '', redirectTo:'/pos/home', pathMatch:'full'},
  {path:'home', component: PosComponent}
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PosRoutingModule { }
