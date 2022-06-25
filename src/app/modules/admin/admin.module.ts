import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import {MaterialModule} from "../../material-module";
import {AdminRoutingModule} from './admin-routing.module';
import {AdminLayoutComponent} from './admin-layout/admin-layout.component';
import {HeaderComponent} from "./commponens/header/header.component";
import {AdminComponent} from './commponens/admin/admin.component';
import {ToolbarComponent} from "./commponens/toolbar/toolbar.component";
import {SharedModule} from './shared/shared.module';
import {SidebarComponent} from "./commponens/sidebar/sidebar.component";
import {FuelCardsComponent} from './commponens/fuel-cards/fuel-cards.component';
import {FuelCardService} from "./service";
import {ReactiveFormsModule} from "@angular/forms";
import {MainInterceptor} from "../../main.interceptor";


@NgModule({
  declarations: [
    AdminLayoutComponent,
    HeaderComponent,
    AdminComponent,
    ToolbarComponent,
    SidebarComponent,
    FuelCardsComponent,
  ],
  exports: [
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    FuelCardService,
    {
      provide:HTTP_INTERCEPTORS,
      multi:true,
      useClass:MainInterceptor
    }
  ]
})
export class AdminModule {
}
