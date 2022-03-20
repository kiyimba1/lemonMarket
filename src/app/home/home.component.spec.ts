import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MediaObserver } from '@angular/flex-layout'
import {
  commonTestingModules,
  commonTestingProviders,
  MediaObserverFake,
} from '../common/common.testing'

import { HomeComponent } from './home.component'

describe('HomeComponent', () => {
  let component: HomeComponent
  let fixture: ComponentFixture<HomeComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: commonTestingModules,
      providers: commonTestingProviders.concat([
        { provide: MediaObserver, useClass: MediaObserverFake },
      ]),
      declarations: [HomeComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
