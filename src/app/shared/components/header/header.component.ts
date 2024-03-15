import { Component, OnInit } from '@angular/core';
import appConfig from '../../../configuration/app-config.json';
import appThemeConfig from '../../../configuration/app-theme-config.json'
import { Store, select } from '@ngrx/store';
import { getAppSecConfigState } from 'src/app/store/reducer/appSecConfig.reducer';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  tataMotorsLogo = appThemeConfig.darkTheme.tataMotorsLogo;
  sparqPlugLogo = appThemeConfig.darkTheme.sparqPlugLogo;
  theme: any = 'dark';
  title = appConfig.appName
  constructor(private store: Store) { }

  async ngOnInit(): Promise<void> {
    this.store.pipe(select(getAppSecConfigState)).subscribe((state: any) => {
      this.theme = state.themeType;
      if (state.themeType === 'dark') {
        this.tataMotorsLogo = appThemeConfig.darkTheme.tataMotorsLogo;
        this.sparqPlugLogo = appThemeConfig.darkTheme.sparqPlugLogo;
      } else {
        this.tataMotorsLogo = appThemeConfig.lightTheme.tataMotorsLogo;
        this.sparqPlugLogo = appThemeConfig.lightTheme.sparqPlugLogo;
      }
    })
  }
}
