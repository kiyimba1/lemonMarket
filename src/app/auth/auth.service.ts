import jwt_decode from 'jwt-decode'

import { User } from './../user/user/user';
import { Role } from './auth.enum';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, filter, flatMap, map, Observable, tap, throwError } from 'rxjs';
import { IUser } from '../user/user/user';
import { transformError } from '../common/common';

@Injectable()
export abstract class AuthService implements IAuthService{
  protected abstract authProvider(email: string, password: string): Observable<IServerAuthResponse>
  protected abstract transformJWToken(token: unknown): IAuthStatus
  protected abstract getCurrentUser(): Observable<User>

  readonly authStatus$: BehaviorSubject<IAuthStatus> = new BehaviorSubject<IAuthStatus>(defaultAuthStatus)
  readonly currentUser$: BehaviorSubject<IUser>= new BehaviorSubject<IUser>(new User())

  constructor() { }

  login(email: string, password: string): Observable<void> {
    const loginResponse$ = this.authProvider(email, password)
    .pipe(
      map((value)=>{
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
    setTimeout(() => this.authStatus$.next(defaultAuthStatus), 0)
  }

  getToken(): string {
    throw new Error('Method not implemented.');
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