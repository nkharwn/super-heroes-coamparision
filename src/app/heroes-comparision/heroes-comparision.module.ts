import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeroesComparisionComponent } from './heroes-comparision.component';
import { HeroesComparisionRoutingModule } from './heroes-comparision-routing.module';
import { AngularMaterialModule } from '../common/module/agular-material/agular-material.module';
import { RedialChartModule } from '../common/module/redial-chart/redial-chart.module';

@NgModule({
  
  declarations: [HeroesComparisionComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    HeroesComparisionRoutingModule,
    RedialChartModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HeroesComparisionModule { }
