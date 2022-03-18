import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, filter, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  template: `
    <div fxLayout="column" fxLayoutAlign="center center">
      <span class="mat-display-2">Hello, Ed!</span>
      <br />
      <button mat-raised-button color="primary" (click)="login()">Login as Manager</button>
    </div>
  `,
  styles: [`
    div[fxLayout] {margin-top: 32px}
  `
  ]
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login('manager@test.com', '12345678')

    combineLatest([
      this.authService.authStatus$, this.authService.currentUser$
    ]).pipe(
      filter(([authStatus, user])=>
        authStatus.isAuthenticated && user?._id !== ''
      ),
      tap(([authStatus, user])=> {
        this.router.navigate(['/manager'])
      })
    ).subscribe()
  }

  ngOnInit(): void {
  }

}
