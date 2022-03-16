import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary" fxLayoutGap="8px">
      <button mat-icon-button><mat-icon>menu</mat-icon><mat-icon svgIcon="lemon"></mat-icon></button>

      <a mat-button routerLink="/home"><h1>LemonMart</h1></a>
      <span class="flex-spacer"></span>
      <button mat-mini-fab routerLink="/user/profile" matToolTip="Profile" aria-label="User Profile">
        <mat-icon>account_circle</mat-icon>
      </button>
      <button mat-mini-fab routerLink="/user/logout" matTooltip="Logout" aria-label="Logout">
        <mat-icon>lock_open</mat-icon>
      </button>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor( iconRegistry: MatIconRegistry, sanitizer: DomSanitizer){
    iconRegistry.addSvgIcon(
      'lemon',
      sanitizer.bypassSecurityTrustResourceUrl(
        'assets/img/icons/lemon.svg'
      )
    )
  }


  title = 'lemon-mart';
}
