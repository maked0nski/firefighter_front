import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AdminLayoutComponent} from "./admin-layout/admin-layout.component";
import {FuelCardsComponent} from "./commponens/fuel-cards/fuel-cards.component";
import {FuelCardResolverService, PositionResolver, SimCardResolver} from "./service/resolve";
import {UserProfileComponent} from "./commponens/user-profile/user-profile.component";
import {SimCardComponent} from "./commponens/sim-card/sim-card.component";
import {PositionComponent} from "./commponens/position/position.component";


const routes: Routes = [
  {
    path: "", component: AdminLayoutComponent, children: [
      {path: 'fuel_card', component: FuelCardsComponent, resolve: {fuelCard: FuelCardResolverService}},
      {path: 'userProfile', component: UserProfileComponent},
      {path: 'sim_card', component: SimCardComponent, resolve: {simCard: SimCardResolver}},
      {path: 'position', component: PositionComponent, resolve: {positions: PositionResolver}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
