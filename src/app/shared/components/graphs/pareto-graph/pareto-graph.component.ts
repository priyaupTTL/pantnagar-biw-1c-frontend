import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import pareto from 'highcharts/modules/pareto';
import { Store, select } from '@ngrx/store';
import appThemeConfig from '../../../../configuration/app-theme-config.json'
import { getAppSecConfigState } from 'src/app/store/reducer/appSecConfig.reducer';

declare let require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);
pareto(Highcharts);

@Component({
  selector: 'app-pareto-graph',
  templateUrl: './pareto-graph.component.html',
  styleUrls: ['./pareto-graph.component.scss']
})
export class ParetoGraphComponent implements OnInit {

  @Input() StackData: any;
  @Input() elementId: string = '';
  @Input() graphTitle: string = '';
  @Input() month: string = '';
  @Input() unit!: string;
  @Input() colorcode = ["#8b8b9b", "#5b5fc4", "#c4b7e4", "#9c9ef1"];
  lightTheme = false;
  StarterColour = "#rgb(43,85,110)";
  ShiftAColour = "#397293";
  ShiftBColour = "#60a4cb";
  ShiftCColour = "#8dc3e2";

  // distribution_graph:any = "#2b556e";
  distribution_graph: any = "#2b556e";
  graphline_color: any = "#478eb8";

  highCharts: any = Highcharts;
  monthInWords!: string;
  width: any = screen.width;
  heightVal: any;
  parameterValues!: any[];
  showFullscreen!: boolean;
  graphData!: any[];
  graphConfig: any;
  traceLayout: any;
  noDataLayout: any;
  constructor(private store: Store) { }

  // ngOnInit(): void {
  //   this.renderGraph();
  // }
  ngOnInit(): void {
    this.lightTheme = false;
    this.store.pipe(select(getAppSecConfigState)).subscribe((state: any) => {
      if (state.themeType === 'dark') {
        this.graphline_color = "#478eb8"
        this.distribution_graph = appThemeConfig.darkTheme.paretoGraphColor
      } else {
        this.graphline_color = "#FF0000";
        this.distribution_graph = appThemeConfig.lightTheme.paretoGraphColor;
      }
      this.renderGraph();
    });
    this.renderGraph();
  }

  ngOnChanges(): void {
    this.renderGraph();
  }

  renderGraph() {

    let width = screen.width;
    let heightVal;
    if (width <= 380) {
      heightVal = 250;
    } else if (width >= 381 && (width <= 800)) {
      heightVal = 280;
    } else if (this.width >= 1000 && (this.width <= 1800)) {
      this.heightVal = 214; //this.heightVal = 150;
    } else {
      heightVal = 200;
    }

    this.highCharts.setOptions({
      colors: [this.distribution_graph]
    });

    if (this.StackData && this.StackData != undefined) {

      let sortable = [];
      for (var vehicle in this.StackData) {
        sortable.push([vehicle, this.StackData[vehicle]]);
      }

      sortable.sort(function (a, b) {
        return a[1] - b[1];
      });

      sortable = sortable.reverse()

      // console.log(sortable,"this is sortable")

      let peretoMeter = [];
      let peretoMeterValue = [];

      for (let i = 0; i < sortable.length; i++) {

        if (sortable[i][0] == 'topcoat') {
          sortable[i][0] = 'TopCoat';
        } else if (sortable[i][0] == "pted") {
          sortable[i][0] = 'PTED';
        }
        else if (sortable[i][0] == "polishing") {
          sortable[i][0] = 'Polishing';
        }
        else if (sortable[i][0] == "compressedAir") {
          sortable[i][0] = 'CompressedAir';
        }
        else if (sortable[i][0] == 'sealerLine') {
          sortable[i][0] = 'Sealer line';
        }
        else if (sortable[i][0] == "other") {
          sortable[i][0] = 'Other';
        }

        //HTPCC

        else if (sortable[i][0] == "ht-pcc1-substation-1") {
          sortable[i][0] = 'HTPCC1';
        }
        else if (sortable[i][0] == "ht-pcc2-substation-2") {
          sortable[i][0] = 'HTPCC2';
        }
        else if (sortable[i][0] == "ht-pcc3-substation-3") {
          sortable[i][0] = 'HTPCC3';
        }
        else if (sortable[i][0] == "ht-pcc4-substation-4") {
          sortable[i][0] = 'HTPCC4';
        }
        else if (sortable[i][0] == "ht-pcc5--substation-5") {
          sortable[i][0] = 'HTPCC5';
        }
        else if (sortable[i][0] == "ht-pcc-6-substation-6") {
          sortable[i][0] = 'HTPCC6';
        }
        else if (sortable[i][0] == "ht-pcc7-substation-7") {
          sortable[i][0] = 'HTPCC7';
        }
        peretoMeter.push(sortable[i][0])
        peretoMeterValue.push(sortable[i][1])
      }

      this.highCharts.chart(this.elementId, {
        chart: {
          renderTo: 'container',
          type: 'column'
        },
        title: {
          text: ''
        },
        tooltip: {
          shared: true
        },
        height: heightVal,
        hovermode: 'x',
        xAxis: {
          categories: peretoMeter,
          crosshair: true,
          title: 'Area'
        },
        yAxis: [{
          title: { text: this.unit }
        }, {
          title: {
            text: ''
          },
          minPadding: 0,
          maxPadding: 0,
          max: 100,
          min: 0,
          opposite: true,
          labels: {
            format: "{value}%"
          }
        }],
        series: [{
          type: 'pareto',
          name: ' ',
          yAxis: 1,
          zIndex: 10,
          baseSeries: 1,
          color: this.graphline_color,
          tooltip: {
            valueDecimals: 2,
            valueSuffix: '%'
          }
        }, {
          name: 'Meters',
          type: 'column',
          zIndex: 2,
          data: peretoMeterValue,
        }],
        credits: {
          enabled: false
        }
      });
    }
  }


}
