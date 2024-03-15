import { Component, OnInit, Input } from '@angular/core';
import * as plotlyicons from '../graph-icons';
declare let Plotly: any;
declare let document: any;

@Component({
  selector: 'app-equipment-bar-graph',
  templateUrl: './equipment-bar-graph.component.html',
  styleUrls: ['./equipment-bar-graph.component.scss']
})
export class EquipmentBarGraphComponent implements OnInit {

  @Input() StackData: any;
  @Input() data!: any[];
  @Input() date!: any[];
  @Input() elementId: string = '';
  @Input() graphTitle: string = '';
  @Input() month: string = '';
  @Input() unit!: string;
  @Input() colorcode = ['#adafe1','#e1dbf1','#cdcef8'];
  monthInWords!: string;
  width: any = screen.width;
  heightVal: any;
  parameterValues!: any[];
  showFullscreen!: boolean;
  graphData!: any[];
  graphConfig: any;
  traceLayout: any;
  noDataLayout: any;
  @Input() filterType: any;
  @Input() UCLData: any;



  constructor() {
    this.width = screen.width;
  }

  ngOnInit(): void {
    this.renderGraph();
  }

  ngOnChanges() {
    this.renderGraph();
  }

  renderGraph() {
    let dtickVal = 200*24*60;

    if (this.width <= 380) {
      this.heightVal = 250;
    } else if (this.width >= 381 && (this.width <= 800)) {
      this.heightVal = 280;
    } else if (this.width >= 1000 && (this.width <= 1800)) {
      this.heightVal = 214; //this.heightVal = 150;
    } else {
      this.heightVal = 200;
    }

    let tickfrmt = '%d';
    let dtick = '';
    let tickposition = '';
    let tkmode = 'linear';
    // console.log("this is stack data --> " ,this.StackData, this.UCLData)

    if (this.filterType == "details") {
     
      tickfrmt = "";
      tickposition = "outside";
      if (this.StackData) {
        if (this.StackData.length > 0 && this.StackData[0]['x'].length > 31) {
          tkmode = 'array'
        }
      }

    }

    // if(this.date != undefined || this.date != null)
    // {

    //   if (this.date.length > 100) dtickVal = 400*24*60;

    //   //if (this.date.length > 400) dtickVal = this.date.length / 25;

    //   if (this.date.length > 800) dtickVal = 1500*24*60;

    //   if (this.date.length > 1000) dtickVal = 1800*24*60;

    // }

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
          text: 'No data received for the provided time range',
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
        showlegend: false,
        legend: {
          x: 0.5,
          xanchor: 'center',
          y: 1.5,
          traceorder: 'normal',
          bgcolor: 'transparent',
          orientation: 'h',
        },
        margin: {
          l: 45,
          r: 30,
          b: 35,
          t: 35,
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
          tickmode: tkmode,
          font: {
            color: '#847fa0',
          },
        },
        yaxis: {
          visible: true,
          title: this.unit,
          hoverformat :'.2f'
        },
        hovermode: 'x',
        autosize: true,
      };

      this.graphData = [
       
        {
          x: this.StackData[0] ? this.StackData[0]['x'] ? this.StackData[0]['x'] : [] : [],
          y: this.StackData[0] ? this.StackData[0]['y'] ? this.StackData[0]['y'] : [] : [],
          name: 'SHIFT A',
          mode: 'lines+markers',
          textposition: 'top',
          stackgroup: 'one',
          type: 'bar',
          hovertemplate: '%{y:.2f}',
          marker: {
            color: this.colorcode[0],
          },
        },
        {
          x: this.StackData[1] ? this.StackData[1]['x'] ? this.StackData[1]['x'] : [] : [],
          y: this.StackData[1] ? this.StackData[1]['y'] ? this.StackData[1]['y'] : [] : [],
          name: 'SHIFT B',
          mode: 'lines+markers',
          textposition: 'top',
          stackgroup: 'one',
          type: 'bar',
          hovertemplate: '%{y:.2f}',
          marker: {
            color: this.colorcode[1],
          },
        },
        {
          x: this.StackData[2] ? this.StackData[2]['x'] ? this.StackData[2]['x'] : [] : [],
          y: this.StackData[2] ? this.StackData[2]['y'] ? this.StackData[2]['y'] : [] : [],
          name: 'SHIFT C',
          mode: 'lines+markers',
          textposition: 'top',
          stackgroup: 'one',
          type: 'bar',
          hovertemplate: '%{y:.2f}',
          marker: {
            color: this.colorcode[2],
          },
        },
      ];
      var UCLDataObj = {
        x: this.StackData[2] ? this.StackData[2]['x'] ? this.StackData[2]['x'] : [] : [],
        y: this.UCLData,
        name: 'UCL',
        type: 'line',
        hovertemplate: '%{y:.2f}',
        marker: {
          color: "#FF0000",
          line: {
            color: "#FF0000",
          }
        },
        line: { dash: 'dot', shape: 'linear', width: 1 }
      }
      if (this.filterType == "monthly" && this.UCLData != undefined) {
        this.graphData = [...this.graphData ,UCLDataObj]
      } 
      let that = this;
      this.graphConfig = {
        modeBarButtonsToAdd: [
          {
            name: 'Bar chart',
            icon: plotlyicons.icons['barchart'],
            direction: 'up',
            click: function (gd: any) {
              gd.data[0]['type'] = 'bar';
              gd.data[1]['type'] = 'bar';
              gd.data[2]['type'] = 'bar';
              // gd.data[3]['type'] = 'bar';

              gd.data[0]['textposition'] = 'outside';
              gd.data[1]['textposition'] = 'outside';
              gd.data[2]['textposition'] = 'outside';
              // gd.data[3]['textposition'] = 'outside';

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
              gd.data[0]['type'] = 'line';
              gd.data[1]['type'] = 'line';
              gd.data[2]['type'] = 'line';
              // gd.data[3]['type'] = 'line';

              gd.data[0]['textposition'] = 'top';
              gd.data[1]['textposition'] = 'top';
              gd.data[2]['textposition'] = 'top';
              // gd.data[3]['textposition'] = 'top';

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
                    let a = 0,
                      b = 0,
                      c = 0,
                      d = 0;
                    if (gd.data[0]['y'][i]) {
                      a = gd.data[0]['y'][i];
                    } else {
                      a = 0;
                    }

                    if (gd.data[1]['y'][i]) {
                      b = gd.data[1]['y'][i];
                    } else {
                      b = 0;
                    }

                    if (gd.data[2]['y'][i]) {
                      c = gd.data[2]['y'][i];
                    } else {
                      c = 0;
                    }

                    // if (gd.data[3]['y'][i]) {
                    //   d = gd.data[3]['y'][i];
                    // } else {
                    //   d = 0;
                    // }
                    result.push(Math.round(Number(a) + Number(b) + Number(c) + Number(d) ));
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
