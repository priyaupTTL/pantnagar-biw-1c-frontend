import { Component, OnInit, Input } from '@angular/core';
import * as plotlyicons from '../graph-icons';
declare let Plotly: any;
declare let document: any;

@Component({
  selector: 'app-equipment-line-graph',
  templateUrl: './equipment-line-graph.component.html',
  styleUrls: ['./equipment-line-graph.component.scss']
})
export class EquipmentLineGraphComponent implements OnInit {

  @Input() StackData: any;
  @Input() data!: any[]
  @Input() date!: any[]
  @Input() elementId: string = '';
  @Input() filterType: string = '';
  @Input() graphTitle: string = '';
  @Input() showBarGraph: string = '';
  @Input() unit!: string;

  @Input() colorcode = [ "#5b5fc4", "#c4b7e4", "#9c9ef1"];

  width: any = screen.width;
  config: any;
  heightVal: any;
  graphConfig: any;
  graphLayout: any;
  showFullscreen: boolean = false;
  noDataLayout: any;
  
  constructor() {}

  ngOnInit(): void {
    this.renderGraph();
  }

  // themestatus:any;

  ngOnChanges(): void {
    this.renderGraph();
  }

  // ngOnDestroy() {
  //   this.ThemeChangeEvent.unsubscribe()
  // }

  renderGraph() {
    // console.log("this is stackdata ------>", this.StackData)

    if (this.width <= 380) {
      this.heightVal = 250;
    } else if (this.width >= 381 && (this.width <= 800)) {
      this.heightVal = 200;
    } else if (this.width >= 1000 && (this.width <= 1800)) {
      this.heightVal = 214; //this.heightVal = 150;
    } else {
      this.heightVal = 200;
    }

    this.noDataLayout = {
      height: this.heightVal,
      "xaxis": {
        "visible": false
      },
      "yaxis": {
        "visible": false
      },
      "annotations": [
        {
          "text": "No data available for the provided time range",
          "xref": "paper",
          "yref": "paper",
          "showarrow": false,
          "font": {
            "size": 15,
            "family": 'sans-serif'
          },
        }
      ],
      autosize: true
    };

 

    this.graphLayout = {
      barmode: 'stack',
      showlegend: false,
      "yaxis": {
        "visible": true,
        title: this.unit,
        hoverformat :'.2f'
      },
      "xaxis": {
        title: 'Hours',
        //type: 'date',
        //"visible": true,
        tickmode: 'linear',
        showticklabels: true,
        automargin: true,
        //tick0: firstIndexDate,
        tickangle: -65,
        //dtick: 2500 * 24 * 60,
        width: 0.2
      },
      height: this.heightVal,
      margin: {
        l: 45,
        r: 30,
        b: 35,
        t: 5,
      },
      legend: {
        x: 0.5,
        y: 3.5,
        xanchor: 'center',
        bgcolor: 'transparent',
        orientation: "h"
      },
      hovermode: 'x',
      autosize: true
    };

    let  day_shiftA: any, day_shiftB: any, day_shiftC: any;



    day_shiftA = {
      name: 'Shift A',
      mode: 'lines',
      stackgroup: 'one',
      type: 'line',
      marker: {
        color: this.colorcode[0],
        line: {
          color: this.colorcode[0],
          width: 2
        }
      }
    }

    day_shiftB = {
      name: 'Shift B',
      mode: 'lines',
      type: 'line',
      stackgroup: 'two',
      marker: {
        color: this.colorcode[1],
        line: {
          color: this.colorcode[1],
          width: 2
        }
      }
    }

    day_shiftC = {
      name: 'Shift C',
      mode: 'lines',
      type: 'line',
      stackgroup: 'three',
      marker: {
        color: this.colorcode[2],
        line: {
          color: this.colorcode[2],
          width: 2
        }
      }
    }
    
    if (this.filterType === 'daily' && this.StackData != undefined) {
     

      day_shiftA = {
        ...day_shiftA,
        x: this.StackData[0] ? this.StackData[0]['x'] ? this.StackData[0]['x'] : [] : [],
        y: this.StackData[0] ? this.StackData[0]['y'] ? this.StackData[0]['y'] : [] : []
      }

      day_shiftB = {
        ...day_shiftB,
        x: this.StackData[1] ? this.StackData[1]['x'] ? this.StackData[1]['x'] : [] : [],
        y: this.StackData[1] ? this.StackData[1]['y'] ? this.StackData[1]['y'] : [] : []
      }

      day_shiftC = {
        ...day_shiftC,
        x: this.StackData[2] ? this.StackData[2]['x'] ? this.StackData[2]['x'] : [] : [],
        y: this.StackData[2] ? this.StackData[2]['y'] ? this.StackData[2]['y'] : [] : []
      }
    }
    let day_wise_status = [ day_shiftA, day_shiftB, day_shiftC];
    // let day_wise_status = [ day_starter,day_shiftA, day_shiftB, day_shiftC];

    let that = this;
    let modeBarButtonsToAddArray3 = [
      {
        name: 'Bar chart',
        icon: plotlyicons.icons['barchart'],
        direction: 'up',
        click: function (gd: any) {
          gd.data[0]['type'] = 'bar';
          gd.data[1]['type'] = 'bar';
          gd.data[2]['type'] = 'bar';
          gd.data[3]['type'] = 'bar';
          gd.layout['height'] = that.heightVal;
          Plotly.newPlot(that.elementId, gd.data, gd.layout, day_wiseconfig);
          if (that.showFullscreen) {
            setTimeout(() => {
              let layout = gd.layout;
              layout['height'] = null;
              Plotly.newPlot('fullscreenGraph', gd.data, layout, day_wiseconfig);
            }, 200);
          } else {
            gd.layout['height'] = that.heightVal;
            Plotly.newPlot(that.elementId, gd.data, gd.layout, day_wiseconfig);
          }
        }
      },
      {
        name: 'Line Chart',
        icon: plotlyicons.icons['linechart'],
        direction: 'up',
        click: function (gd: any) {

          gd.data[0]['type'] = 'line';
          gd.data[1]['type'] = 'line';
          gd.data[2]['type'] = 'line';
          gd.data[3]['type'] = 'line';
          gd.layout['height'] = that.heightVal;

          Plotly.newPlot(that.elementId, gd.data, gd.layout, day_wiseconfig);

          if (that.showFullscreen) {
            setTimeout(() => {
              let layout = gd.layout;
              layout['height'] = null;
              Plotly.newPlot('fullscreenGraph', gd.data, layout, day_wiseconfig);
            }, 200);
          } else {
            gd.layout['height'] = that.heightVal;
            Plotly.newPlot(that.elementId, gd.data, gd.layout, day_wiseconfig);
          }
        }
      },
      {
        name: 'Expand Fullscreen',
        icon: plotlyicons.icons['fullscreen'],
        click: function (gd: any) {
          that.showFullscreen = true;
          gd.layout['height'] = null;

          if (that.showFullscreen) {
            setTimeout(() => {
              document.getElementById('title-fullscreen').innerHTML = that.graphTitle;
              Plotly.newPlot('fullscreenGraph', gd.data, gd.layout, day_wiseconfig);
            }, 200);
          }
        }
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
    ];
    let day_wiseconfig: any;
    if (this.showBarGraph === 'false') {
      day_wiseconfig = {
        modeBarButtonsToAdd: [modeBarButtonsToAddArray3[2], modeBarButtonsToAddArray3[3]], //modeBarButtonsToAdd: [modeBarButtonsToAddArray3[2]],
        displaylogo: false, responsive: true, scrollZoom: false
      }
    } else {
      day_wiseconfig = {
        modeBarButtonsToAdd: [...modeBarButtonsToAddArray3],
        displaylogo: false, responsive: true, scrollZoom: false
      }
    }


    if (this.StackData === undefined) {
      Plotly.newPlot(this.elementId, [], this.noDataLayout, this.graphConfig);
    } else if (this.StackData.constructor === Array && this.StackData.length === 0) {
      Plotly.newPlot(this.elementId, [], this.noDataLayout, this.graphConfig);
    } else if (this.StackData.constructor === Object && Object.keys(this.StackData).length === 0) {
      Plotly.newPlot(this.elementId, [], this.noDataLayout, this.graphConfig);
    } else {
      Plotly.newPlot(this.elementId, day_wise_status, this.graphLayout, day_wiseconfig);
    }
  }

}
