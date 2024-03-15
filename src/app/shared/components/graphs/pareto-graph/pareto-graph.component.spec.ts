import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParetoGraphComponent } from './pareto-graph.component';

describe('ParetoGraphComponent', () => {
  let component: ParetoGraphComponent;
  let fixture: ComponentFixture<ParetoGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParetoGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParetoGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
