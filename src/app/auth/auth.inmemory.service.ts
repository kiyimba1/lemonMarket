import { Role } from 'src/app/auth/auth.enum'
import { Injectable } from '@angular/core'
import { Observable, of, throwError } from 'rxjs'
import { AuthService, IServerAuthResponse, IAuthStatus } from './auth.service'
import { sign } from 'fake-jwt-sign'
import { PhoneType, User } from '../user/user/user'

@Injectable({
  providedIn: 'root',
})
export class InMemoryAuthService extends AuthService {
  protected transformJWToken(token: IAuthStatus): IAuthStatus {
    return token
  }
  protected getCurrentUser(): Observable<User> {
    return of(this.defaultUser)
  }

  private defaultUser = User.Build({
    _id: '5da01751da27cc462d265913',
    email: 'ed@gmail.com',
    name: { first: 'Edwin', last: 'Kiyimba' },
    picture: 'https://secure.gravatar.com/avatar/7cbaa9afb5ca78d97f3c689f8ce6c985',
    role: Role.Manager,
    dateOfBirth: new Date(1999, 1, 1),
    userStatus: true,
    address: {
      line1: '101 Sesama Kamala',
      city: 'Bethesda',
      state: 'Maryland',
      zip: '20810',
    },
    level: 2,
    phones: [
      {
        id: 0,
        type: PhoneType.Mobile,
        digits: '55675655455',
      },
    ],
  })

  protected authProvider(
    email: string,
    password: string
  ): Observable<IServerAuthResponse> {
    email = email.toLocaleLowerCase()

    if (!email.endsWith('@test.com')) {
      return throwError('Failed to login! Email needs to end with @test.com')
    }

    const authStatus = {
      isAuthenticated: true,
      userId: this.defaultUser._id,
      userRole: email.includes('cashier')
        ? Role.Cashier
        : email.includes('clerk')
        ? Role.Clerk
        : email.includes('manager')
        ? Role.Manager
        : Role.None,
    } as IAuthStatus

    this.defaultUser.role = authStatus.userRole

    const authResponse = {
      accessToken: sign(authStatus, 'secret', {
        expiresIn: '1h',
        algorithm: 'none',
      }),
    } as IServerAuthResponse

    return of(authResponse)
  }

  constructor() {
    super()
    console.warn(
      "You're using the InMemoryAuthService. Do not use this service in production."
    )
  }
}
