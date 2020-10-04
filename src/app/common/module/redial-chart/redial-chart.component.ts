import { Component, OnInit, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { isPlatformBrowser } from '@angular/common';
import { DataService } from 'src/app/_shared/services/data.service';

@Component({
  selector: 'app-redial-chart',
  templateUrl: './redial-chart.component.html',
  styleUrls: ['./redial-chart.component.css']
})
export class RedialChartComponent implements OnInit {

  private chart: am4charts.RadarChart;

  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.currentdata.subscribe(chartData => {
      if (chartData != "default message") {
        this.loadChart(chartData)
      }
      else {
        this.removeChart();
      }

    })

  }
  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  loadChart(chartData: any) {
    // Chart code goes in here
    this.browserOnly(() => {
      am4core.useTheme(am4themes_animated);
      let chart = am4core.create("chartdiv", am4charts.RadarChart);
      chart.data = chartData;
      /* Create axes */
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis() as any);
      categoryAxis.dataFields.category = "name";
      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis() as any);
      valueAxis.extraMin = 0.2;
      valueAxis.extraMax = 0.2;
      valueAxis.tooltip.disabled = true;

      /* Create and configure series */
      let series1 = chart.series.push(new am4charts.RadarSeries());
      series1.dataFields.valueY = "combat";
      series1.dataFields.categoryX = "name";
      series1.strokeWidth = 3;
      series1.tooltipText = "{valueY}";
      series1.name = "combat";
      series1.bullets.create(am4charts.CircleBullet);
      series1.dataItems.template.locations.categoryX = 0.5;

      let series2 = chart.series.push(new am4charts.RadarSeries());
      series2.dataFields.valueY = "durability";
      series2.dataFields.categoryX = "name";
      series2.strokeWidth = 3;
      series2.tooltipText = "{valueY}";
      series2.name = "durability";
      series2.bullets.create(am4charts.CircleBullet);
      series2.dataItems.template.locations.categoryX = 0.5;

      let series3 = chart.series.push(new am4charts.RadarSeries());
      series3.dataFields.valueY = "intelligence";
      series3.dataFields.categoryX = "name";
      series3.strokeWidth = 3;
      series3.tooltipText = "{valueY}";
      series3.name = "intelligence";
      series3.bullets.create(am4charts.CircleBullet);
      series3.dataItems.template.locations.categoryX = 0.5;

      let series4 = chart.series.push(new am4charts.RadarSeries());
      series4.dataFields.valueY = "power";
      series4.dataFields.categoryX = "name";
      series4.strokeWidth = 3;
      series4.tooltipText = "{valueY}";
      series4.name = "power";
      series4.bullets.create(am4charts.CircleBullet);
      series4.dataItems.template.locations.categoryX = 0.5;


      let series5 = chart.series.push(new am4charts.RadarSeries());
      series5.dataFields.valueY = "speed";
      series5.dataFields.categoryX = "name";
      series5.strokeWidth = 3;
      series5.tooltipText = "{valueY}";
      series5.name = "speed";
      series5.bullets.create(am4charts.CircleBullet);
      series5.dataItems.template.locations.categoryX = 0.5;

      let series6 = chart.series.push(new am4charts.RadarSeries());
      series6.dataFields.valueY = "strength";
      series6.dataFields.categoryX = "name";
      series6.strokeWidth = 3;
      series6.tooltipText = "{valueY}";
      series6.name = "strength";
      series6.bullets.create(am4charts.CircleBullet);
      series6.dataItems.template.locations.categoryX = 0.5;

      chart.cursor = new am4charts.RadarCursor();
      //chart.scrollbarX = new am4core.Scrollbar();
      //chart.scrollbarY = new am4core.Scrollbar();
      chart.legend = new am4charts.Legend();
      this.chart = chart;
    });
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.removeChart();
  }

  removeChart() {
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}
