import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as actions from '../app/store/action/index'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private store: Store){}
  ngOnInit() {
    this.store.dispatch(actions.appConfigInit())
    this.store.dispatch(actions.appSecConfigInit())
    this.store.dispatch(actions.appEqInit())

  }
}
