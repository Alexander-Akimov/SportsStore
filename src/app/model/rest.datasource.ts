import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "./product.model";
import { Cart } from "./cart.model";
import { Order } from "./order.model";

const PROTOCOL = "http";
const PORT = 5000;

@Injectable()
export class RestDataSource {
    baseUrl: string;

    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
         this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
        //this.baseUrl = baseUrl;//for https
    }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.baseUrl + "api/products");
    }
    
    saveOrder(order: Order): Observable<Order> {
        return this.http.post<Order>(this.baseUrl + "api/orders", order);
    }
}