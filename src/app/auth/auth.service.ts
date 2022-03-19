import jwt_decode from 'jwt-decode'

import { User } from './../user/user/user'
import { Role } from './auth.enum'
import { Injectable } from '@angular/core'
import {
  BehaviorSubject,
  catchError,
  concatMap,
  filter,
  flatMap,
  map,
  Observable,
  pipe,
  tap,
  throwError,
} from 'rxjs'
import { IUser } from '../user/user/user'
import { transformError } from '../common/common'
import { cacheService } from './cache.service'

@Injectable()
export abstract class AuthService extends cacheService implements IAuthService {
  protected abstract authProvider(
    email: string,
    password: string
  ): Observable<IServerAuthResponse>
  protected abstract transformJWToken(token: unknown): IAuthStatus
  protected abstract getCurrentUser(): Observable<User>
  protected setToken(jwt: string) {
    this.setItem('jwt', jwt)
  }

  protected clearToken() {
    this.removeItem('jwt')
  }

  protected hasExpiredToken(): boolean {
    const jwt = this.getToken()

    if (jwt) {
      const payload = jwt_decode(jwt) as any
      return Date.now() >= payload.exp * 1000
    }
    return true
  }

  protected getAuthStatusFromToken(): IAuthStatus {
    return this.transformJWToken(jwt_decode(this.getToken()))
  }

  readonly authStatus$: BehaviorSubject<IAuthStatus> = new BehaviorSubject<IAuthStatus>(
    defaultAuthStatus
  )
  readonly currentUser$: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(new User())

  private getAndUpdateUserIfAuthenticated = pipe(
    filter((status: IAuthStatus) => status.isAuthenticated),
    concatMap(() => this.getCurrentUser()),
    map((user: IUser) => this.currentUser$.next(user)),
    catchError(transformError)
  )

  constructor() {
    super()
    if (this.hasExpiredToken()) {
      this.logout(true)
    } else {
      this.authStatus$.next(this.getAuthStatusFromToken())
      //To load user on browser refresh, resume pipeline must activate on the next cycle which allows for all services to be constructed properly
      setTimeout(() => this.resumeCurrentUser$.subscribe(), 0)
    }
  }

  login(email: string, password: string): Observable<void> {
    this.clearToken()

    const loginResponse$ = this.authProvider(email, password).pipe(
      map((value) => {
        this.setToken(value.accessToken)
        const token = jwt_decode(value.accessToken)
        console.log(token)

        return this.transformJWToken(token)
      }),

      tap((status: IAuthStatus) => this.authStatus$.next(status)),
      this.getAndUpdateUserIfAuthenticated
    )

    loginResponse$.subscribe({
      error: (err) => {
        console.log(err)

        this.logout()
        return throwError
      },
    })

    return loginResponse$
  }

  logout(clearToken?: boolean): void {
    if (clearToken) {
      this.clearToken()
    }
    setTimeout(() => this.authStatus$.next(defaultAuthStatus), 0)
  }

  getToken(): string {
    return this.getItem('jwt') ?? ''
  }

  protected readonly resumeCurrentUser$ = this.authStatus$.pipe(
    this.getAndUpdateUserIfAuthenticated
  )
}

export interface IAuthStatus {
  isAuthenticated: boolean
  userRole: Role
  userId: string
}

export interface IServerAuthResponse {
  accessToken: string
}

export const defaultAuthStatus: IAuthStatus = {
  isAuthenticated: false,
  userRole: Role.None,
  userId: '',
}

export interface IAuthService {
  readonly authStatus$: BehaviorSubject<IAuthStatus>
  readonly currentUser$: BehaviorSubject<IUser>
  login(email: string, password: string): Observable<void>
  getToken(): string
}
