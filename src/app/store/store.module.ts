import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { StoreComponent } from "./store.component";
import { ModelModule } from '../model/model.module';
import { CounterDirective } from './counter.directive';
import { CartSummaryComponent } from './cartSummary.component';
import { CartDetailComponent } from './cartDetail.component';
import { CheckoutComponent } from './checkout.component';
import { RouterModule } from "@angular/router";
import { StoreFirstGuard } from '../storeFirst.guard';

let routing = RouterModule.forChild([
    { path: "", component: StoreComponent },
    { path: "cart", component: CartDetailComponent},
    { path: "checkout", component: CheckoutComponent},
    { path: "**", redirectTo: "" }
]);


@NgModule({
    imports: [ModelModule, FormsModule, CommonModule, RouterModule, routing],
    declarations: [StoreComponent, CounterDirective, CartSummaryComponent, CartDetailComponent, CheckoutComponent],
    providers: [StoreFirstGuard],
    exports: [StoreComponent, CartDetailComponent, CheckoutComponent]
})
export class StoreModule { }