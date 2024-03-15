import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import appThemeConfig from '../../../configuration/app-theme-config.json';
import { getAppSecConfigState } from 'src/app/store/reducer/appSecConfig.reducer';
import equipmentList from '../../../configuration/equipment-list.json'
import * as actions from 'src/app/store/action/index'
import * as $ from 'jquery'
import { ArrangementDistribution } from '../../model/equipment-tab';
import { getAppEqState } from 'src/app/store/reducer/appEqState.reducer';

@Component({
  selector: 'app-equipment-tab',
  templateUrl: './equipment-tab.component.html',
  styleUrls: ['./equipment-tab.component.scss']
})
export class EquipmentTabComponent implements OnInit {

  theme: any = 'dark';
  blockSelected: any = 'total';
  subAreaSelected: any = '';
  equipmentUnit: any = 'kWh';
  totalConsumptionValue: any = 0;
  arrowLeft: any = appThemeConfig.darkTheme.leftIcon;
  arrowRight: any = appThemeConfig.darkTheme.rightIcon
  menuIcon: any = appThemeConfig.darkTheme.menuIcon
  calenderIcon: any = appThemeConfig.darkTheme.calenderIcon
  downArrow: any = appThemeConfig.darkTheme.downArrowIcon
  showMoreText: string = "Show Less";
  showMainDiv: boolean = true;
  meterwiseEqList: ArrangementDistribution = equipmentList.meterwise;
  selectedSubAreaList: any[] = []
  areaList: any = [];

  constructor(private store: Store) { }

  async ngOnInit(): Promise<void> {
    // let state = await lastValueFrom(this.store.pipe(select(getAppConfigState), take(1)));
    this.store.pipe(select(getAppSecConfigState)).subscribe((state: any) => {
      this.theme = state.themeType
      if (state.themeType === 'dark') {
        this.arrowLeft = appThemeConfig.darkTheme.leftIcon;
        this.arrowRight = appThemeConfig.darkTheme.rightIcon;
        this.menuIcon = appThemeConfig.darkTheme.menuIcon;
        this.calenderIcon = appThemeConfig.darkTheme.calenderIcon;
        this.downArrow = appThemeConfig.darkTheme.downArrowIcon
      } else {
        this.arrowLeft = appThemeConfig.lightTheme.leftIcon;
        this.arrowRight = appThemeConfig.lightTheme.rightIcon;
        this.menuIcon = appThemeConfig.lightTheme.menuIcon;
        this.calenderIcon = appThemeConfig.lightTheme.calenderIcon;
        this.downArrow = appThemeConfig.lightTheme.downArrowIcon
      }
    });

    this.store.pipe(select(getAppEqState)).subscribe((state: any) => {
      console.log("The state -->",state)
      this.blockSelected = state.selectedArea;
      this.subAreaSelected = state.selectedSubArea
      this.areaList = state.areaList
      this.selectedSubAreaList = state.subAreaList
    })
  }

  selectBlock(selectedBlockName: any) {
    this.store.dispatch(actions.appEqSelectArea(selectedBlockName))
  }

  selectSubSection(selectedSubSection: any) {
    this.store.dispatch(actions.appEqSelectSubArea(selectedSubSection))
  }

  mobileSlideBack() {
    jQuery('#tree-meter-li').animate({ scrollLeft: '+=350' })
  }

  mobileSlideNext() {
    jQuery('#tree-meter-li').animate({ scrollLeft: '-=350' })
  }

  leftScroll() {
    jQuery('#subAreaMain').animate({ scrollLeft: '-=300' })
    // document.getElementById('subAreaMain').scrollLeft -= 100;
  }
  rightScroll() {
    jQuery('#subAreaMain').animate({ scrollLeft: '+=300' })
    // document.getElementById('subAreaMain').scrollLeft -= 100;
  }

  ShowAreaSubArea(data: any) {
    if (data == "Show Less") {
      this.showMoreText = 'Show Less';
      this.showMainDiv = true;
    }
    else if (data == "Show More") {
      this.showMoreText = 'Show More';
      this.showMainDiv = false;
    }
  }

}
