import { Component } from "@angular/core";
import { Cart } from '../model/cart.model';
import { ConnectionService } from '../model/connection.service';

@Component({
    // template: `<div><h3 class="bg-info p-1 text-white">Cart Detail Component</h3></div>`,
    templateUrl: "cartDetail.component.html"
})
export class CartDetailComponent {
    public connected: boolean = true;


    constructor(public cart: Cart, private connection: ConnectionService) {
        this.connected = this.connection.connected;
        connection.Changes.subscribe((state) => this.connected = state);
    }

    get checkoutEnabled(): boolean {
        return this.cart.lines.length == 0 || !this.connected;
    }
}