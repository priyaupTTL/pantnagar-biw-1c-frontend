import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentLineGraphComponent } from './equipment-line-graph.component';

describe('EquipmentLineGraphComponent', () => {
  let component: EquipmentLineGraphComponent;
  let fixture: ComponentFixture<EquipmentLineGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentLineGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentLineGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
