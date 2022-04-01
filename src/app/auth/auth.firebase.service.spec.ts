import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { autoSpyObj } from 'angular-unit-test-helper'
import { UiService } from '../common/ui.service'
import { FirebaseAuthService } from './auth.firebase.service'

TestBed.configureTestingModule({
  imports: [HttpClientTestingModule],

  providers: [
    FirebaseAuthService,

    { provide: UiService, useValue: autoSpyObj(UiService) },

    {
      provide: AngularFireAuth,

      useValue: autoSpyObj(AngularFireAuth),
    },
  ],
})
