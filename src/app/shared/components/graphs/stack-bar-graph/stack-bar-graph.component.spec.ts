import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackBarGraphComponent } from './stack-bar-graph.component';

describe('StackBarGraphComponent', () => {
  let component: StackBarGraphComponent;
  let fixture: ComponentFixture<StackBarGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StackBarGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StackBarGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
