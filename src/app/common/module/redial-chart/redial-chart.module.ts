import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedialChartComponent } from './redial-chart.component';



@NgModule({
  declarations: [RedialChartComponent],
  imports: [
    CommonModule
  ],
  exports:[
    RedialChartComponent
  ]
})
export class RedialChartModule { }
