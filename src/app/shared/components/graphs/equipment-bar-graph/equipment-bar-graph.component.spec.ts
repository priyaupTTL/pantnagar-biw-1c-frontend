import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentBarGraphComponent } from './equipment-bar-graph.component';

describe('EquipmentBarGraphComponent', () => {
  let component: EquipmentBarGraphComponent;
  let fixture: ComponentFixture<EquipmentBarGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentBarGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentBarGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
