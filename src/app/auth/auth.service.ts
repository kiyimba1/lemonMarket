import jwt_decode from 'jwt-decode'

import { User } from './../user/user/user';
import { Role } from './auth.enum';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, filter, flatMap, map, Observable, tap, throwError } from 'rxjs';
import { IUser } from '../user/user/user';
import { transformError } from '../common/common';
import { cacheService } from './cache.service';

@Injectable()
export abstract class AuthService extends cacheService implements IAuthService{
  protected abstract authProvider(email: string, password: string): Observable<IServerAuthResponse>
  protected abstract transformJWToken(token: unknown): IAuthStatus
  protected abstract getCurrentUser(): Observable<User>
  protected setToken(jwt: string){
    this.setItem('jwt', jwt)
  }
  protected clearToken() {
    this.removeItem('jwt')
  }



  readonly authStatus$: BehaviorSubject<IAuthStatus> = new BehaviorSubject<IAuthStatus>(defaultAuthStatus)
  readonly currentUser$: BehaviorSubject<IUser>= new BehaviorSubject<IUser>(new User())

  constructor() {
    super()
   }

  login(email: string, password: string): Observable<void> {
    this.clearToken()

    const loginResponse$ = this.authProvider(email, password)
    .pipe(
      map((value)=>{
        this.setToken(value.accessToken)
        const token = jwt_decode(value.accessToken)
        return this.transformJWToken(token)
      }),
      tap((status: IAuthStatus)=> this.authStatus$.next(status)),
      filter((status: IAuthStatus)=>status.isAuthenticated),
      flatMap(()=> this.getCurrentUser()),
      map(user => this.currentUser$.next(user)),
      catchError(transformError)
    )
    loginResponse$.subscribe({
      error: err => {
        this.logout()
        return throwError
      },
    })
    return loginResponse$
  }
  logout(clearToken?: boolean): void {
    if(clearToken){
      this.clearToken()
    }
    setTimeout(() => this.authStatus$.next(defaultAuthStatus), 0)
  }

  getToken(): string {
    return this.getItem('jwt') ?? ''
  }
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
  userId: ''
}

export interface IAuthService {
  readonly authStatus$: BehaviorSubject<IAuthStatus>
  readonly currentUser$: BehaviorSubject<IUser>
  login(email: string, password: string): Observable<void>
  getToken(): string
}