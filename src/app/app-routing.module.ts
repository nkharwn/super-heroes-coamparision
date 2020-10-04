import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'',redirectTo:"/comparision",pathMatch:"full"},
  {path:'comparision', loadChildren:()=>import("./heroes-comparision/heroes-comparision.module").then(m=>m.HeroesComparisionModule)},
  
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
