import { Component, OnInit } from '@angular/core';
import version from '../../../../../package.json';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  year : any
  package = version.version

  constructor() { }

  ngOnInit(): void {
    this.year = new Date().getFullYear();
  }

}
