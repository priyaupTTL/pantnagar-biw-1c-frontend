import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreaPageComponent } from './area-page/area-page.component';
import { EquipmentPageComponent } from './equipment-page/equipment-page.component';
import { ContainerPageComponent } from './container-page/container-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
    AreaPageComponent,
    EquipmentPageComponent,
    ContainerPageComponent
  ],
    imports: [
        CommonModule,
        SharedModule
    ],
    exports: [
      ContainerPageComponent
    ]
})
export class PageModule {}