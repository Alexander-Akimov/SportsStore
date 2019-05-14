import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { StoreModule } from './store/store.module';
import { StoreComponent } from './store/store.component';
import { CartDetailComponent } from './store/cartDetail.component';
import { CheckoutComponent } from './store/checkout.component';


let routing = RouterModule.forRoot([
  {
    path: "store",
    loadChildren: "./store/store.module#StoreModule"
  },  
  {
    path: "admin",
    loadChildren: "./admin/admin.module#AdminModule",
  },
  { path: "**", redirectTo: "/store", pathMatch: 'full' },
  { path: '', component: AppComponent }
]);

@NgModule({
  imports: [BrowserModule, routing],
  declarations: [AppComponent],
 
  bootstrap: [AppComponent]
})
export class AppModule { }
