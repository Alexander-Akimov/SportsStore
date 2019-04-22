import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Order } from '../model/order.model';
import { OrderRepository } from '../model/order.repository';

@Component({
    // template: `<div><h3 class="bg-info p-1 text-white">Checkout Component</h3></div>`
    templateUrl: "checkout.component.html",
    styleUrls: ["checkout.component.css"]
})
export class CheckoutComponent {
    orderSent: boolean = false;
    submitted: boolean = false;

    constructor(public repository: OrderRepository, public order: Order) { }

    submitOrder(form: NgForm) {
        this.submitted = true;
        if (form.valid) {
            this.repository.saveOrder(this.order).subscribe(order => {
                //TODO: do something with order
                this.order.clear();
                this.orderSent = true;
                this.submitted = false;
            });
        }
    }
}