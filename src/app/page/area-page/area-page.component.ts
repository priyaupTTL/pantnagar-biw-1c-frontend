import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { UtilityService } from 'src/app/shared/services/utility-services/utility.service';
import { getAppConfigState } from 'src/app/store/reducer/appConfig.reducer';
import appConfiguration from '../../configuration/app-config.json';
import appThemeConfig from '../../configuration/app-theme-config.json'
import { getAppSecConfigState } from 'src/app/store/reducer/appSecConfig.reducer';
import { cumulativeShiftConsumption, sumationOfArrays } from 'src/app/shared/utility/utility';
import { getAppEqState } from 'src/app/store/reducer/appEqState.reducer';

@Component({
  selector: 'app-area-page',
  templateUrl: './area-page.component.html',
  styleUrls: ['./area-page.component.scss']
})
export class AreaPageComponent implements OnInit {
  @Input() selectedLevel: any;
  constructor(private utilityService: UtilityService, private store: Store) { }
  tempObj = { "calledby_area": "overview", "isSerial": "false", "timeline": "daily", "dateFormValue": "Sun Feb 04 2024", "dailyDateForm": "Sun Feb 04 2024", "eqVehStatus": false, "meterOrLine": "meter" }
  paretoGraphData = [];
  percentageGraphData: any[] = [];
  isMeterOrLineValue: any;
  calenderType: any;
  eqVehicleValue: any;
  consumptionUnit: any = appConfiguration.consumptionUnit;
  colorCodeLineGraph: any = []
  colorCodeBarGraph: any = []
  finalStackGraphData: any = [];
  individualGraphData: any = {}
  individualHorizontalGraphData: any = {}
  blockSelected: any;
  subAreaSelected: any;
  areaList: any = [];
  selectedSubAreaList: any = [];

  //temp
  tempEqObj: any = {};
  tempEqObjHorbarGraph: any = {};
  ngOnInit(): void {

    this.store.pipe(select(getAppConfigState)).subscribe((state: any) => {
      // this.currState = state
      this.isMeterOrLineValue = state.meterOrLine
      this.eqVehicleValue = state.eqVehicle
      this.calenderType = state.calenderType
    });

    this.store.pipe(select(getAppSecConfigState)).subscribe((state: any) => {
      if (state.themeType === 'dark') {
        this.colorCodeLineGraph = appThemeConfig.darkTheme.lineGraph;
        this.colorCodeBarGraph = appThemeConfig.darkTheme.barGraph;
      } else {
        this.colorCodeLineGraph = appThemeConfig.lightTheme.lineGraph;
        this.colorCodeBarGraph = appThemeConfig.lightTheme.barGraph;
      }
    });

    this.store.pipe(select(getAppEqState)).subscribe((state: any) => {
      this.blockSelected = state.selectedArea;
      this.subAreaSelected = state.selectedSubArea
      this.areaList = state.areaList
      this.selectedSubAreaList = state.subAreaList

      this.callApi()
    })
  }

  callApi() {
    this.finalStackGraphData = []
    this.individualGraphData = []
    this.individualHorizontalGraphData = []
    this.utilityService.callPostAPI('overview/meterwise/', this.tempObj).subscribe((res: any) => {
      console.log('Res --> ', res);

      this.paretoGraphData = res.data.energyAreaConsumption;
      this.percentageGraphData = Object.entries(res.data.energyPercentageConsumption).map(([key,]) => {
        return { ...res.data.energyPercentageConsumption[key], name: key };
      })


      Object.entries(res.data).map(([key, value]) => {
        if (key.includes('-substation-')) {
          if (key.includes('-piechart'))
            this.tempEqObjHorbarGraph[key] = value
          else
            this.tempEqObj[key] = value
        }
      });
      console.log('tempp --> ', this.tempEqObjHorbarGraph)

      if (this.calenderType === 'daily') {
        Object.entries(this.tempEqObj).forEach(([key, value]: any) => {
          // debugger
          this.finalStackGraphData.push({
            x: [].concat(value.ShiftA.x, value.ShiftB.x.slice(1), value.ShiftC.x.slice(1)),
            y: [].concat(value.ShiftA.y, value.ShiftB.y.slice(1), value.ShiftC.y.slice(1)),
            name: key
          })
        })
      } else {
        Object.entries(this.tempEqObj).forEach(([key, value]: any) => {
          // debugger
          this.finalStackGraphData.push({
            x: value.ShiftA.x,
            y: sumationOfArrays([value.ShiftA.y, value.ShiftA.y, value.ShiftA.y]),
            name: key
          })
        })
      }

      Object.entries(this.tempEqObj).forEach(([key, value]: any) => {
        if (cumulativeShiftConsumption(value['ShiftA']['y']) > 0 ||
          cumulativeShiftConsumption(value['ShiftB']['y']) > 0 ||
          cumulativeShiftConsumption(value['ShiftC']['y']) > 0) {
          this.individualGraphData[key] = [
            {
              x: value['ShiftA']['x'],
              y: value['ShiftA']['y']
            },
            {
              x: value['ShiftB']['x'],
              y: value['ShiftB']['y']
            },
            {
              x: value['ShiftC']['x'],
              y: value['ShiftC']['y']
            }
          ]

        } else {
          this.individualGraphData = {
            [key]: [],
            // 'horizontalStackBarGraphData': {
            //   [key]: 
            // }
          }
        }
      })
      Object.entries(this.tempEqObjHorbarGraph).forEach(([key, value]: any) => {
        // debugger
        if (value['ShiftA'] > 0 || value['ShiftB'] > 0 || value['ShiftC'] > 0) {
          this.individualHorizontalGraphData[key] = {
            graphData: [value.ShiftA, value.ShiftB, value.ShiftC],
            total: Math.round(value.ShiftA + value.ShiftB + value.ShiftC)
          }
        } else {
          this.individualHorizontalGraphData[key] = {
            graphData: [],
            total: 0
          }
        }
      })
    })
  }
}
