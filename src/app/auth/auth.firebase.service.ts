import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { User as FirebaseUser } from '../user/user/user'
import { Observable, Subject } from 'rxjs'
import { map } from 'rxjs/operators'
import { IUser, User } from '../user/user/user'
import { Role } from './auth.enum'
import {
  AuthService,
  IAuthStatus,
  IServerAuthResponse,
  defaultAuthStatus,
} from './auth.service'

interface IJwtToken {
  email: string
  lat: number
  exp: number
  sub: string
}

@Injectable()
export class FirebaseAuthService extends AuthService {
  constructor(private afAuth: AngularFireAuth) {
    super()
  }

  protected authProvider(
    email: string,
    password: string
  ): Observable<IServerAuthResponse> {
    const serverResponse$ = new Subject<IServerAuthResponse>()

    this.afAuth.signInWithEmailAndPassword(email, password).then(
      (res) => {
        const firebaseUser: any | null = res.user
        firebaseUser?.getIdToken().then(
          (token: any) =>
            serverResponse$.next({ accessToken: token } as IServerAuthResponse),
          (err: any) => serverResponse$.error(err)
        )
      },
      (err) => serverResponse$.error(err)
    )
    return serverResponse$
  }

  protected transformJWToken(token: IJwtToken): IAuthStatus {
    if (!token) {
      return defaultAuthStatus
    }

    return {
      isAuthenticated: token.email ? true : false,
      userId: token.sub,
      userRole: Role.None,
    }
  }

  protected getCurrentUser(): Observable<User> {
    return this.afAuth.user.pipe(map(this.transformFirebaseUser))
  }

  private transformFirebaseUser(firebaseUser: any): User {
    if (!firebaseUser) {
      return new User()
    }

    return User.Build({
      name: {
        first: firebaseUser?.displayName?.split(' ')[0] || 'firebase',
        last: firebaseUser?.displayName?.split(' ')[1] || 'User',
      },
      picture: firebaseUser.photoUrl,
      email: firebaseUser.email,
      _id: firebaseUser.uid,
      role: Role.None,
    } as IUser)
  }

  override logout() {
    if (!this.afAuth) {
      return
    }
    this.clearToken()
    this.authStatus$.next(defaultAuthStatus)
  }
}
