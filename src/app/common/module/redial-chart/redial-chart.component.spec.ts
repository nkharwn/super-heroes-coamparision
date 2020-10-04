import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedialChartComponent } from './redial-chart.component';

describe('RedialChartComponent', () => {
  let component: RedialChartComponent;
  let fixture: ComponentFixture<RedialChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedialChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedialChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
