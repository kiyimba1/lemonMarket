import { UiService } from './../common/ui.service'
import { EmailValidation, PasswordValidation } from './../common/validations'
import { catchError, combineLatest, filter, tap } from 'rxjs'
import { ActivatedRoute, Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { SubSink } from 'subsink'
import { AuthService } from '../auth/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    `
      .error {
        color: red;
      }
    `,
    `
      div[fxLayout] {
        margin-top: 32px;
      }
    `,
  ],
})
export class LoginComponent implements OnInit {
  private subs = new SubSink()
  // loginForm = new FormGroup({
  //   email: new FormControl(''),
  //   password: new FormControl(''),
  // })
  loginForm!: FormGroup
  loginError = ''
  redirectUrl!: string

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private uiService: UiService
  ) {
    this.subs.sink = route.paramMap.subscribe(
      (params) => (this.redirectUrl = params.get('redirectUrl') ?? '')
    )
  }

  ngOnInit(): void {
    this.authService.logout()
    this.buildLoginForm()
  }

  buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', EmailValidation],
      password: ['', PasswordValidation],
    })
  }

  async login(submittedForm: FormGroup) {
    // console.log('login called with form data ======= ', submittedForm)

    this.authService
      .login(submittedForm.value.email, submittedForm.value.password)
      .pipe(catchError((err) => (this.loginError = err)))

    this.subs.sink = combineLatest([
      this.authService.authStatus$,
      this.authService.currentUser$,
    ])
      .pipe(
        filter(([authStatus, user]) => authStatus.isAuthenticated && user?._id !== ''),
        tap(([authStatus, user]) => {
          // console.log('in pipe noow .....')

          this.uiService.showToast(`Welcome ${user.fullName}! Role: ${user.role}`)
          // this.uiService.showDialog(`Welcome ${user.fullName}!`, `Role: ${user.role}`)
          this.router.navigate([this.router.navigate([this.redirectUrl || '/manager'])])
        })
      )
      .subscribe()
  }
}
