import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, filter, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  template: `
    <div *ngIf="(authService.authStatus$ | async)?.isAuthenticated; else doLogin">
      <div class="mat-display-4">
        This is Lemn Mart!
      </div>
      <div class="mat-display-4">
        You get a lemon
      </div>
    </div>
    <ng-template #doLogin>
      <app-login></app-login>
    </ng-template>
  `,
  styles: [`
    div[fxLayout] {margin-top: 32px}
  `
  ]
})
export class HomeComponent implements OnInit {
  displayLogin = true

  constructor(public authService: AuthService) {

   }



  ngOnInit(): void {
  }

}
