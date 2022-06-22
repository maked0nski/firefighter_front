import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AdminLayoutComponent} from "./admin-layout/admin-layout.component";
import {FuelCardsComponent} from "./commponens/fuel-cards/fuel-cards.component";


const routes: Routes = [
  {path: "", component: AdminLayoutComponent, children:[
      {path:'fuel_card', component: FuelCardsComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
