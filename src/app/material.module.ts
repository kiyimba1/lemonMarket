import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTooltipModule} from '@angular/material/tooltip'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'



const modules = [MatButtonModule, MatIconModule, MatToolbarModule,MatTooltipModule, MatCardModule, MatFormFieldModule, MatInputModule]



@NgModule({
  declarations: [],
  imports: modules,
  exports: modules
})
export class MaterialModule { }
