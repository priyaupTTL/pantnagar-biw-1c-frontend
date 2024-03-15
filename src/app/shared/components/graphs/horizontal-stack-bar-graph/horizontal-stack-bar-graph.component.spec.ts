import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalStackBarGraphComponent } from './horizontal-stack-bar-graph.component';

describe('HorizontalStackBarGraphComponent', () => {
  let component: HorizontalStackBarGraphComponent;
  let fixture: ComponentFixture<HorizontalStackBarGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorizontalStackBarGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorizontalStackBarGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
