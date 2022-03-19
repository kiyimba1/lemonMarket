import { Component } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'

import { MatIconRegistry } from '@angular/material/icon'
import { AuthService } from './auth/auth.service'

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar
      color="primary"
      fxLayoutGap="8px"
      *ngIf="{
        status: authService.authStatus$ | async,
        user: authService.currentUser$ | async
      } as auth"
    >
      <button mat-icon-button>
        <mat-icon *ngIf="auth?.status?.isAuthenticated">menu</mat-icon
        ><mat-icon svgIcon="lemon"></mat-icon>
      </button>

      <a mat-button routerLink="/home"><h1>LemonMart</h1></a>
      <span class="flex-spacer"></span>
      <button
        mat-mini-fab
        routerLink="/user/profile"
        matToolTip="Profile"
        aria-label="User Profile"
        *ngIf="auth?.status?.isAuthenticated"
      >
        <img
          *ngIf="auth?.user?.picture"
          class="image-cropper"
          [src]="auth?.user?.picture"
        />
        <mat-icon *ngIf="!auth?.user?.picture">account_circle</mat-icon>
      </button>
      <button
        mat-mini-fab
        routerLink="/user/logout"
        matTooltip="Logout"
        aria-label="Logout"
        *ngIf="auth?.status?.isAuthenticated"
      >
        <mat-icon>lock_open</mat-icon>
      </button>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      .image-cropper {
        width: 40px;
        height: 40px;
        position: relative;
        overflow: hidden;
        border-radius: 50%;
        margin-top: -8px;
      }
    `,
  ],
})
export class AppComponent {
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    public authService: AuthService
  ) {
    iconRegistry.addSvgIcon(
      'lemon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/lemon.svg')
    )
  }

  title = 'lemon-mart'
}
