import {
  commonTestingModules,
  commonTestingProviders,
  MediaObserverFake,
} from './common/common.testing'
import { DomSanitizer } from '@angular/platform-browser'
import { TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { AppComponent } from './app.component'
import { MediaObserver } from '@angular/flex-layout'
import { MatIconRegistry } from '@angular/material/icon'

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, commonTestingModules],
      providers: commonTestingProviders.concat([
        { provide: MediaObserver, useClass: MediaObserverFake },
      ]),
      declarations: [AppComponent],
    }).compileComponents()
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })
})
