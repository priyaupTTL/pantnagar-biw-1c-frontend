import { Component, OnInit, Input } from '@angular/core';
import * as plotlyicons from '../graph-icons';
import { Store, select } from '@ngrx/store';
import { getAppSecConfigState } from 'src/app/store/reducer/appSecConfig.reducer';
import appThemeConfig from '../../../../configuration/app-theme-config.json'

declare let Plotly: any;
declare let document: any;

@Component({
  selector: 'app-percentage-graph',
  templateUrl: './percentage-graph.component.html',
  styleUrls: ['./percentage-graph.component.scss']
})
export class PercentageGraphComponent implements OnInit {

  @Input() StackData: any;
  @Input() data!: any[];
  @Input() date!: any[];
  @Input() elementId: string = '';
  @Input() graphTitle: string = '';
  @Input() month: string = '';
  @Input() unit!: string;
  @Input() equipNames: any = [];
  @Input() filterType: any = '';
  @Input() colorcode: any = [];

  theme: any;
  monthInWords!: string;
  width: any = screen.width;
  heightVal: any;
  parameterValues!: any[];
  showFullscreen!: boolean;
  graphData!: any[];
  graphConfig: any;
  traceLayout: any;
  noDataLayout: any;
  graphXaxisTitle: any = '';
  percentageBarGraphTheme: string[] = [];

  constructor(private store: Store) { }

  ngOnInit(): void {

    if (this.filterType == 'daily') {
      this.graphXaxisTitle = 'Hours';
    } else if (this.filterType == 'monthly' || this.filterType == 'details') {
      this.graphXaxisTitle = 'Date';
    }

    this.store.pipe(select(getAppSecConfigState)).subscribe((state: any) => {
      this.theme = state.themeType;
      if (state.themeType === 'dark') {
        this.percentageBarGraphTheme = appThemeConfig.darkTheme.percentageBarGraph
      } else {
        this.percentageBarGraphTheme = appThemeConfig.lightTheme.percentageBarGraph;
      }
      this.renderGraph();
    });

    this.renderGraph();
  }

  ngOnChanges(): void {
    this.renderGraph();
    console.log('Stack Data--> ', this.StackData)
  }
  renderGraph() {
    if (this.filterType == 'daily') {
      this.graphXaxisTitle = 'Hours';
    } else if (this.filterType == 'monthly' || this.filterType == 'details') {
      this.graphXaxisTitle = 'Date';
    }

    let dtickVal = 200 * 24 * 60;

    if (this.width <= 380) {
      this.heightVal = 280;
    } else if (this.width >= 381 && (this.width <= 800)) {
      this.heightVal = 300;
    } else if (this.width >= 1000 && (this.width <= 1800)) {
      this.heightVal = 280; //this.heightVal = 150;
    } else {
      this.heightVal = 270;
    }


    let tickfrmt = '%d';
    let dtick = '';
    let tickposition = '';
    let tkmode = 'linear';
    if (this.filterType == "details") {
      tickfrmt = "";
      tickposition = "outside";
      if (this.StackData.length > 0 && this.StackData[0]['x'].length > 31) {
        tkmode = 'array'
      }
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
      //d = new Date(this.StackData[0]['x'][0]);
      //this.monthInWords = d.toLocaleString('default', { month: 'long' });

      this.traceLayout = {
        showlegend: true,
        legend: {
          x: 0.5,
          xanchor: 'center',
          y: 1.5,
          traceorder: 'normal',
          bgcolor: 'transparent',
          orientation: 'h',
        },
        margin: {
          l: 40,
          r: 35,
          b: 25,
          t: 20,
        },
        height: this.heightVal,
        barmode: 'stack',
        xaxis: {
          showticklabels: true,
          automargin: true,
          constraintoward: 'center',
          title: `Date`,
          tickformat: tickfrmt,
          tickangle: -65,
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
        yaxis: {
          visible: true,
          // title: this.unit + ' %',
          title: this.unit,
        },
        hovermode: 'x',
        autosize: true,
      };



      let newArray = []
      for (var index = 0; index < this.StackData.length; index++) {
        let obj: any = {};
        obj["x"] = this.StackData[index]['x'],
          obj["y"] = this.StackData[index]['y'],
          obj['name'] = this.StackData[index]['name'],
          obj['mode'] = 'lines+markers',
          obj['textposition'] = 'top',
          obj['stackgroup'] = 'one',
          obj['type'] = 'bar',
          obj['marker'] = {
            color: this.percentageBarGraphTheme[index],
          }

        newArray.push(obj);

      }
      this.graphData = newArray

      let that = this;
      this.graphConfig = {
        modeBarButtonsToAdd: [
          {
            name: 'Bar chart',
            icon: plotlyicons.icons['barchart'],
            direction: 'up',
            click: function (gd: any) {

              for (let i = 0; i < that.StackData.length; i++) {
                gd.data[i]['type'] = 'bar';

              }

              for (let i = 0; i < that.StackData.length; i++) {
                gd.data[i]['textposition'] = 'outside';
              }


              gd.layout['barmode'] = 'stack';
              gd.layout['height'] = that.heightVal;
              Plotly.newPlot(that.elementId, gd.data, gd.layout, that.graphConfig);
              if (that.showFullscreen) {
                setTimeout(() => {
                  let layout = gd.layout;
                  layout['height'] = null;
                  Plotly.newPlot(
                    'fullscreenGraph',
                    gd.data,
                    layout,
                    that.graphConfig
                  );
                }, 200);
              }
              else {
                gd.layout['height'] = that.heightVal;
                Plotly.newPlot(that.elementId, gd.data, gd.layout, that.graphConfig);
              }
            },
          },
          {
            name: 'Line Chart',
            icon: plotlyicons.icons['linechart'],
            direction: 'up',
            click: function (gd: any) {
              for (let i = 0; i < that.StackData.length; i++) {
                gd.data[i]['type'] = 'line';
              }

              for (let i = 0; i < that.StackData.length; i++) {
                gd.data[i]['textposition'] = 'top';
              }


              gd.layout['height'] = that.heightVal;
              Plotly.newPlot(that.elementId, gd.data, gd.layout, that.graphConfig);
              if (that.showFullscreen) {
                setTimeout(() => {
                  let layout = gd.layout;
                  layout['height'] = null;
                  Plotly.newPlot(
                    'fullscreenGraph',
                    gd.data,
                    layout,
                    that.graphConfig
                  );
                }, 200);
              }
              else {
                Plotly.newPlot(
                  that.elementId,
                  gd.data,
                  gd.layout,
                  that.graphConfig
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
                    that.graphConfig
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

              if (gd.layout['annotations'] == undefined) flag = true;
              else {
                flag = false;
                delete gd.layout['annotations'];
              }

              if (flag == true) {
                let result = [];
                if (gd.data[0]['y']) {
                  for (let i = 0; i < gd.data[0]['y'].length; i++) {

                    let data = [];
                    for (let a = 0; a < gd.data.length; a++) {
                      if (gd.data[a]['y'][i]) {
                        data.push(gd.data[a]['y'][i])
                      }
                      else {
                        data.push(0);
                      }
                    }
                    let sum = 0;
                    for (let z = 0; z < data.length; z++) {
                      sum = sum + data[z];
                    }

                    // result.push(sum);
                    result.push(Number(sum).toFixed(2));

                  }
                }

                let coordinates = [gd.data[2]['x'], result];
                for (let j = 0; j < gd.data.length; j++) {
                  for (let i = 0; i < coordinates[0].length; i++) {
                    annotations.push({
                      x: coordinates[0][i],
                      y: coordinates[1][i],
                      text: result[i],
                      textangle: -65,
                      textposition: 'top',
                      showarrow: false,
                      yshift: 18,
                      font: {
                        size: 12,
                      },
                    });
                  }
                }
                gd.layout['annotations'] = annotations;
              }
              let layout = gd.layout;
              layout['height'] = that.heightVal;
              Plotly.newPlot(that.elementId, gd.data, gd.layout, that.graphConfig);

              if (that.showFullscreen) {
                setTimeout(() => {
                  let layout = gd.layout;
                  layout['height'] = null;
                  Plotly.newPlot(
                    'fullscreenGraph',
                    gd.data,
                    layout,
                    that.graphConfig
                  );
                }, 200);
              }
              else {
                let layout = gd.layout;
                layout['height'] = that.heightVal;
                Plotly.newPlot(that.elementId, gd.data, gd.layout, that.graphConfig);
              }
            },
          },
        ],
        displaylogo: false,
        responsive: true,
        scrollZoom: false,
      };
    }
    if (this.StackData === undefined) {
      Plotly.newPlot(this.elementId, [], this.noDataLayout, this.graphConfig);
    } else if (this.StackData.constructor === Array && this.StackData.length === 0) {
      Plotly.newPlot(this.elementId, [], this.noDataLayout, this.graphConfig);
    } else if (this.StackData.constructor === Object && Object.keys(this.StackData).length === 0) {
      Plotly.newPlot(this.elementId, [], this.noDataLayout, this.graphConfig);
    } else {
      Plotly.newPlot(this.elementId, this.graphData, this.traceLayout, this.graphConfig);
    }
  }


}
