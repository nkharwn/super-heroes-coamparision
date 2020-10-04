import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesComparisionComponent } from './heroes-comparision.component';

describe('HeroesComparisionComponent', () => {
  let component: HeroesComparisionComponent;
  let fixture: ComponentFixture<HeroesComparisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroesComparisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComparisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
