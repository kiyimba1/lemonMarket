import { User } from './../user/user/user';
import { Role } from './auth.enum';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from '../user/user/user';

@Injectable()
export abstract class AuthService implements IAuthService{
  readonly authStatus$: BehaviorSubject<IAuthStatus> = new BehaviorSubject<IAuthStatus>(defaultAuthStatus)
  readonly currentUser$: BehaviorSubject<IUser>= new BehaviorSubject<IUser>(new User())

  constructor() { }

  login(email: string, password: string): Observable<void> {
    throw new Error('Method not implemented.');
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