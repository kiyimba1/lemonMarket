import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTooltipModule} from '@angular/material/tooltip'



const modules = [MatButtonModule, MatIconModule, MatToolbarModule,MatTooltipModule]



@NgModule({
  declarations: [],
  imports: modules,
  exports: modules
})
export class MaterialModule { }
