import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from "./app-routing.module";
import {RouterModule} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {AppComponent} from './app.component';
import {MainLayoutComponent} from './layout/main-layout/main-layout.component';
import {NotFoundComponent} from './layout/not-found/not-found.component';
import {SpinnerComponent} from "./modules/admin/shared/spinner.component";
import {MainInterceptor} from "./main.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    NotFoundComponent,
    SpinnerComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      multi:true,
      useClass:MainInterceptor
    }
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
