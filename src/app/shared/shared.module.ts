import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { UtilityBarComponent } from './components/utility-bar/utility-bar.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { EquipmentTabComponent } from './components/equipment-tab/equipment-tab.component';
import { PercentageGraphComponent } from './components/graphs/percentage-graph/percentage-graph.component';
import { ParetoGraphComponent } from './components/graphs/pareto-graph/pareto-graph.component';
import { EquipmentBarGraphComponent } from './components/graphs/equipment-bar-graph/equipment-bar-graph.component';
import { EquipmentLineGraphComponent } from './components/graphs/equipment-line-graph/equipment-line-graph.component';
import { StackBarGraphComponent } from './components/graphs/stack-bar-graph/stack-bar-graph.component';
import { HorizontalStackBarGraphComponent } from './components/graphs/horizontal-stack-bar-graph/horizontal-stack-bar-graph.component';

@NgModule({
    declarations: [
    HeaderComponent,
    FooterComponent,
    UtilityBarComponent,
    EquipmentTabComponent,
    PercentageGraphComponent,
    ParetoGraphComponent,
    EquipmentBarGraphComponent,
    EquipmentLineGraphComponent,
    StackBarGraphComponent,
    HorizontalStackBarGraphComponent
  ],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MatDatepickerModule,
      BrowserAnimationsModule
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        UtilityBarComponent,
        EquipmentTabComponent,
        PercentageGraphComponent,
        ParetoGraphComponent,
        EquipmentBarGraphComponent,
        EquipmentLineGraphComponent,
        StackBarGraphComponent,
        HorizontalStackBarGraphComponent
    ]
})

export class SharedModule {}