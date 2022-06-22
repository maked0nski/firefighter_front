import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from "./app-routing.module";
import {RouterModule} from "@angular/router";

import {AppComponent} from './app.component';
import {MainLayoutComponent} from './layout/main-layout/main-layout.component';
import {NotFoundComponent} from './layout/not-found/not-found.component';
import {SpinnerComponent} from "./modules/admin/shared/spinner.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    NotFoundComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
