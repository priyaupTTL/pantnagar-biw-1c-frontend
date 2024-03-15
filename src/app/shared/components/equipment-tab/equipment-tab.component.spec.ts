import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentTabComponent } from './equipment-tab.component';

describe('EquipmentTabComponent', () => {
  let component: EquipmentTabComponent;
  let fixture: ComponentFixture<EquipmentTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
