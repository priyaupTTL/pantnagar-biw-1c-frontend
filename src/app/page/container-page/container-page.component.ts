import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { UtilityService } from 'src/app/shared/services/utility-services/utility.service';
import { getAppConfigState } from 'src/app/store/reducer/appConfig.reducer';
import appConfiguration from '../../configuration/app-config.json';
import appThemeConfig from '../../configuration/app-theme-config.json'
import { getAppSecConfigState } from 'src/app/store/reducer/appSecConfig.reducer';
import { cumulativeShiftConsumption, sumationOfArrays } from 'src/app/shared/utility/utility';
import { getAppEqState } from 'src/app/store/reducer/appEqState.reducer';

@Component({
  selector: 'app-container-page',
  templateUrl: './container-page.component.html',
  styleUrls: ['./container-page.component.scss']
})
export class ContainerPageComponent implements OnInit {

  constructor( private store: Store) { }
  selectedLevel: any;
  
  ngOnInit(): void {
    this.store.pipe(select(getAppEqState)).subscribe((state: any) => {
      this.selectedLevel = state.selectedLevel
    });
  }
}
