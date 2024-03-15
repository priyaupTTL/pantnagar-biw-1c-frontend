import { Component, Input, OnInit } from '@angular/core';
import * as plotlyicons from '../graph-icons';
import { isObject } from 'highcharts';
import appThemeConfig from '../../../../configuration/app-theme-config.json'

import { Store, select } from '@ngrx/store';
import { getAppSecConfigState } from 'src/app/store/reducer/appSecConfig.reducer';
declare let Plotly: any;
declare let document: any;


@Component({
  selector: 'app-horizontal-stack-bar-graph',
  templateUrl: './horizontal-stack-bar-graph.component.html',
  styleUrls: ['./horizontal-stack-bar-graph.component.scss']
})
export class HorizontalStackBarGraphComponent implements OnInit {

  
  @Input() StackData: any;
  @Input() data!: any[];
  @Input() elementId: string = '';
  @Input() graphTitle: string = '';
  lightTheme = false;
  @Input() showBarGraph: string = '';
  @Input() colorcode = ["#5b5fc4", "#c4b7e4", "#9c9ef1"];
  @Input() unit!: string;
  @Input() filterType: any = '';
  shiftNames = ["Shift A", "Shift B", "Shift C"]

  percentageBarGraphTheme: any = appThemeConfig.darkTheme.lineGraph;
  width: any = screen.width;
  heightVal: any;
  showFullscreen!: boolean;
  graphData!: any[];
  graphConfig: any;
  traceLayout: any;
  noDataLayout: any;
  graphXaxisTitle: any = '';
  constructor(private store: Store) { }

  ngOnInit(): void {

    this.store.pipe(select(getAppSecConfigState)).subscribe((state: any) => {
      if (state.themeType === 'dark') {
        this.percentageBarGraphTheme = appThemeConfig.darkTheme.lineGraph
      } else {
        this.percentageBarGraphTheme = appThemeConfig.lightTheme.lineGraph;
      }
      this.renderGraph();
    });
    this.renderGraph();
  }

  ngOnChanges(): void {
    this.renderGraph();
  }

  renderGraph() {


    if (this.width <= 380) {
      this.heightVal = 180;
    } else if (this.width >= 381 && (this.width <= 800)) {
      this.heightVal = 250;
    } else if (this.width >= 1000 && (this.width <= 1800)) {
      this.heightVal = 210; //this.heightVal = 150;
    } else {
      this.heightVal = 200;
    }

    this.graphData! = [];
    let tickfrmt = '%d';
    // let dtick = '';
    let tickposition = 'outside';
    let tkmode = 'linear';
    if (this.filterType == "details") {
      tickfrmt = "";

    }
    this.noDataLayout = {
      height: this.heightVal,
      xaxis: {
        visible: false,
      },
      yaxis: {
        visible: false,
      },
      annotations: [
        {
          text: 'No data available for the provided time range',
          xref: 'paper',
          yref: 'paper',
          showarrow: false,
          font: {
            size: 15,
            family: 'sans-serif',
          },
        },
      ],
    };

    let d;
    if (this.StackData && this.StackData.length > 0) {

      this.traceLayout = {
        // width: 200,
        // height: 150,
        margin: {
          l: 70,
          r: 35,
          b: 30,
          t: 50,
        },
        height: this.heightVal,
        barmode: 'stack',
        yaxis: {

          showticklabels: true,
          automargin: true,
          constraintoward: 'center',
          tickformat: tickfrmt,
          // tickangle: -65,
          visible: true,
          // tickmode: 'linear',
          tickmode: tkmode,
          font: {
            color: '#847fa0',
          },
          ticks: tickposition,
          tickwidth: 2,
          ticklen: 5,
        },
        autosize: true,
        annotations: [
          {
            text: '',
            xref: 'paper',
            yref: 'paper',
            // x: -0.2,
            // y: -0.109,
            showarrow: false,
            font: {
              size: 15,
              family: 'sans-serif',
            },
          },
        ],

      }

      let trace: any = {
        y: this.shiftNames,
        mode: 'lines+markers',
        textposition: 'top',
        type: 'bar',
        orientation: 'h',
        marker: {
          color: this.percentageBarGraphTheme,
          width: 1,


        },
      }
      for (let val in this.StackData) {
        if (trace['x'] != undefined && trace['x'].length > 0) {
          let valRoudoff = (Math.round(this.StackData[val] * 100) / 100);
          trace['x'].push(valRoudoff);
          trace['text'].push(valRoudoff);
        } else {
          let valRoudoff = (Math.round(this.StackData[val] * 100) / 100);
          trace['x'] = [valRoudoff];
          trace['text'] = [valRoudoff];
        }

      }
      this.graphData = [trace];

    }
    let that = this;
    let modeBarButtonsToAddArray = [
      {
        name: 'Bar chart',
        icon: plotlyicons.icons['barchart'],
        direction: 'up',
        click: function (gd: any) {

          for (let index = 0; index < that.StackData.length; index++) {

            gd.data[index]['type'] = 'bar';
            gd.data[index]['textposition'] = 'outside';
          }

          gd.layout['barmode'] = 'stack';
          gd.layout['height'] = that.heightVal;
          Plotly.newPlot(that.elementId, gd.data, gd.layout, day_wiseconfig);
          if (that.showFullscreen) {
            setTimeout(() => {
              let layout = gd.layout;
              layout['height'] = null;
              Plotly.newPlot(
                'fullscreenGraph',
                gd.data,
                layout,
                day_wiseconfig
              );
            }, 200);
          }
          else {
            gd.layout['height'] = that.heightVal;
            Plotly.newPlot(that.elementId, gd.data, gd.layout, day_wiseconfig);
          }
        },
      },
      {
        name: 'Line Chart',
        icon: plotlyicons.icons['linechart'],
        direction: 'up',
        click: function (gd: any) {

          for (let index = 0; index < that.StackData.length; index++) {
            gd.data[index]['type'] = 'line';
            gd.data[index]['textposition'] = 'top';
          }

          gd.layout['height'] = that.heightVal;
          Plotly.newPlot(that.elementId, gd.data, gd.layout, day_wiseconfig);
          if (that.showFullscreen) {
            setTimeout(() => {
              let layout = gd.layout;
              layout['height'] = null;
              Plotly.newPlot(
                'fullscreenGraph',
                gd.data,
                layout,
                day_wiseconfig
              );
            }, 200);
          }
          else {
            Plotly.newPlot(
              that.elementId,
              gd.data,
              gd.layout,
              day_wiseconfig
            );
          }
        },
      },
      {
        name: 'Expand Fullscreen',
        icon: plotlyicons.icons['fullscreen'],
        click: function (gd: any) {
          that.showFullscreen = true;
          gd.layout['height'] = null;

          if (that.showFullscreen) {
            setTimeout(() => {
              document.getElementById('title-fullscreen').innerHTML =
                that.graphTitle;
              Plotly.newPlot(
                'fullscreenGraph',
                gd.data,
                gd.layout,
                day_wiseconfig
              );
            }, 200);
          }
        },

      },
      {
        name: 'Text Display/Hide',
        icon: plotlyicons.icons['textshowhide'],
        click: function (gd: any) {
          let annotations = [];
          let flag = false;

          if (gd.layout['annotations'] == undefined)
            flag = true;
          else {
            flag = false;
            delete gd.layout['annotations'];
          }

          if (flag == true) {
            for (let j = 0; j < gd.data.length; j++) {
              let coordinates = [gd.data[j]['x'], gd.data[j]['y']]
              let annodeText = gd.data[j]['y'];
              if (coordinates[1] !== undefined && coordinates[0] !== undefined) {
                for (let i = 0; i < coordinates[0].length; i++) {
                  annotations.push({
                    x: coordinates[0][i],
                    y: coordinates[1][i],
                    text: Math.round(annodeText[i]), //Math.round(annodeText[i]) === 0 ? '' : Math.round(annodeText[i])
                    textangle: -65,
                    textposition: 'top',
                    showarrow: false,
                    yshift: 18,
                    font: {
                      size: 12
                    }
                  })
                }
              }
            }
            gd.layout['annotations'] = annotations;
          }

          // Plotly.newPlot(that.elementId, gd.data, gd.layout, { displaylogo: false, responsive: true, scrollZoom: true });
          gd.layout['height'] = that.heightVal;
          Plotly.newPlot(that.elementId, gd.data, gd.layout, day_wiseconfig);
          if (that.showFullscreen) {
            setTimeout(() => {
              let layout = gd.layout;
              layout['height'] = null;
              Plotly.newPlot('fullscreenGraph', gd.data, layout, day_wiseconfig); //, this.config
            }, 200);
          } else {
            let layout = gd.layout;
            layout['height'] = that.heightVal;
            Plotly.newPlot(that.elementId, gd.data, gd.layout, day_wiseconfig);
          }
        }
      }
    ]

    let day_wiseconfig: any;
    if (this.showBarGraph === 'false') {
      day_wiseconfig = {
        modeBarButtonsToAdd: [modeBarButtonsToAddArray[2]], //modeBarButtonsToAdd: [modeBarButtonsToAddArray3[2]],
        displaylogo: false, responsive: true, scrollZoom: false
      }
    } else {
      day_wiseconfig = {
        modeBarButtonsToAdd: [...modeBarButtonsToAddArray],
        displaylogo: false, responsive: true, scrollZoom: false
      }
    }
    if (this.StackData === undefined) {
      Plotly.newPlot(this.elementId, [], this.noDataLayout, this.graphConfig);
    } else if (this.StackData.constructor === Array && this.StackData.length === 0) {
      Plotly.newPlot(this.elementId, [], this.noDataLayout, this.graphConfig);
    } else if (this.StackData.constructor === Object && isObject(this.StackData, true) && Object.keys(this.StackData).length === 0) {
      Plotly.newPlot(this.elementId, [], this.noDataLayout, this.graphConfig);
    } else {
      Plotly.newPlot(this.elementId, this.graphData, this.traceLayout, day_wiseconfig);
    }
  }


}






