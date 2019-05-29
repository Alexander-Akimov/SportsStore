import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


let routing = RouterModule.forRoot([
  {
    path: "store",
    loadChildren: () => import('./store/store.module').then(m => m.StoreModule)
  },  
  {
    path: "admin",
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  { path: "**", redirectTo: "/store", pathMatch: 'full' },
  { path: '', component: AppComponent }
]);

@NgModule({
  imports: [BrowserModule, routing, ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })],
  declarations: [AppComponent],
 
  bootstrap: [AppComponent]
})
export class AppModule { }
