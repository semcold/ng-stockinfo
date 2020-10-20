import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StocksInfoComponent } from './stocks-info/stocks-info.component';


const routes: Routes = [
  {
    path: "",
    redirectTo: "stocks-info",
    pathMatch: "full"
  },

  {
    path: "stocks-info",
    component: StocksInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
