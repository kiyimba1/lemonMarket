import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MediaObserver } from '@angular/flex-layout'
import {
  commonTestingModules,
  commonTestingProviders,
  MediaObserverFake,
} from 'src/app/common/common.testing'

import { LogoutComponent } from './logout.component'

describe('LogoutComponent', () => {
  let component: LogoutComponent
  let fixture: ComponentFixture<LogoutComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: commonTestingModules,
      providers: commonTestingProviders.concat([
        { provide: MediaObserver, useClass: MediaObserverFake },
      ]),
      declarations: [LogoutComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
