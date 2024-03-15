import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import appThemeConfig from '../../../configuration/app-theme-config.json';
import appConfig from '../../../configuration/app-config.json';
import { getAppConfigState } from 'src/app/store/reducer/appConfig.reducer';
import { getAppSecConfigState } from 'src/app/store/reducer/appSecConfig.reducer';
import * as actions from 'src/app/store/action/index'
import moment from 'moment';
import { formatDate } from '@angular/common';
import { FormControl } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, NativeDateAdapter } from '@angular/material/core';
import { lastValueFrom, take } from 'rxjs';
import { getAppEqState } from 'src/app/store/reducer/appEqState.reducer';

export const PICK_FORMATS = {
  parse: {
    dateInput: { month: 'short', year: 'numeric', day: 'numeric' }
  },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' }
  }
};

class PickDateAdapter extends NativeDateAdapter {

  override format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      return formatDate(date, 'dd-MMM-yy', this.locale);;
    } else if (displayFormat === 'input_Month') {
      return formatDate(date, 'MMM-yy', this.locale);;
    } else {
      return date.toDateString();
    }
  }
}

@Component({
  selector: 'app-utility-bar',
  templateUrl: './utility-bar.component.html',
  styleUrls: ['./utility-bar.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: PickDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS }
  ]
})

export class UtilityBarComponent implements OnInit {
  theme: any = 'dark';
  arrowLeft: any = appThemeConfig.darkTheme.leftIcon;
  arrowRight: any = appThemeConfig.darkTheme.rightIcon
  menuIcon: any = appThemeConfig.darkTheme.menuIcon
  calenderIcon: any = appThemeConfig.darkTheme.calenderIcon
  showNextArrow: boolean = false
  isMeterOrLineValue: any = 'meter';
  eqVehicleValue: any = false;
  calenderType: any = 'daily';
  yearListArr: any = [];
  arrangementList: any = [];
  startingYear = appConfig.firstYear;
  startingMonth = appConfig.firstMonth;
  // dailyDateForm: any;
  rangeepicker: any
  maxDt: any
  maxDate: any = new Date();
  minDate: any;
  dailyDateForm = new FormControl(new Date());
  rangeStartDateForm = new FormControl((new Date()).toISOString());
  rangeEndDateForm = new FormControl((new Date()).toISOString());
  monthlyDateForm = new FormControl((new Date()).toISOString());
  currState: any;
  constructor(private store: Store) { }

  async ngOnInit(): Promise<void> {
    this.yearLoader()
    let equipmentState = await lastValueFrom(this.store.pipe(select(getAppEqState), take(1)));
    if (equipmentState)
      this.arrangementList = equipmentState.arrangementList
    this.store.pipe(select(getAppConfigState)).subscribe((state: any) => {
      this.currState = state
      this.isMeterOrLineValue = state.meterOrLine
      this.eqVehicleValue = state.eqVehicle
      this.calenderType = state.calenderType
      this.showNextArrow = state.showNextArrow
      this.dailyDateForm = new FormControl(new Date(state.currentDate))
      if (state.calenderType === 'monthly') {
        PICK_FORMATS.display.dateInput = 'input_Month';
        this.monthlyDateForm = new FormControl(new Date(state.monthlyStartEnd.start).toISOString())
      } else if (state.calenderType === 'daily') {
        PICK_FORMATS.display.dateInput = 'input';
      } else if (state.calenderType === 'details') {
        PICK_FORMATS.display.dateInput = 'input';
      }
    });
    this.store.pipe(select(getAppSecConfigState)).subscribe((state: any) => {
      this.theme = state.themeType;
      if (state.themeType === 'dark') {
        this.arrowLeft = appThemeConfig.darkTheme.leftIcon;
        this.arrowRight = appThemeConfig.darkTheme.rightIcon;
        this.menuIcon = appThemeConfig.darkTheme.menuIcon;
        this.calenderIcon = appThemeConfig.darkTheme.calenderIcon;
      } else {
        this.arrowLeft = appThemeConfig.lightTheme.leftIcon;
        this.arrowRight = appThemeConfig.lightTheme.rightIcon;
        this.menuIcon = appThemeConfig.lightTheme.menuIcon;
        this.calenderIcon = appThemeConfig.lightTheme.calenderIcon
      }
    });
  }

  yearLoader() {
    let length = parseInt(moment().format('YYYY'));
    let CurrentFYMonth = parseInt(moment().format('MM'))
    let checkYearlength = length
    if (this.startingMonth <= CurrentFYMonth) {
      checkYearlength += 1;
    }
    for (let i = this.startingYear; i < checkYearlength; i++) {
      let strr = `FY ${i}-${i + 1}`
      this.yearListArr.push(strr)
    }
  }

  toggleMeterOrLine() {
    this.store.dispatch(actions.appConfigChangeMeterLine())
    if (this.isMeterOrLineValue === 'meter') {
      this.isMeterOrLineValue = 'line'
    } else {
      this.isMeterOrLineValue = 'meter'
    }
    this.store.dispatch(actions.appEqChangeArrangementType(this.isMeterOrLineValue))
  }
  toggleEqVehicle() {
    this.eqVehicleValue = !this.eqVehicleValue;
    this.store.dispatch(actions.appConfigEqVehicle())
  }

  mobileBack() { }

  calenderTypeSelector(calType: any, prevOrnext: any) {
    this.calenderType = calType
    this.store.dispatch(actions.appConfigCalenderTypeSelector(calType, prevOrnext))
  }

  onSelectYear(value1: any, value2: any) {
    console.log(value1, value2)
  }



  openNav() {
    this.store.dispatch(actions.appSecConfigChangeTheme())
  }

  mobileNext() { }

  datePicker(selectedDate: any) {
    this.store.dispatch(actions.appConfigDateSelector(this.calenderType, selectedDate))
  }

  dateRangeChange(value1: any, value2: any) {
    console.log(value1, value2)
  }
}
