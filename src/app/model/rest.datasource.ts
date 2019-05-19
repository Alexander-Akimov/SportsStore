import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Order } from "./order.model";
import Product from "./product.model";
import Category from './category.model';

const PROTOCOL = "http";
const PORT = 5000;

@Injectable()
export class RestDataSource {
    //baseUrl: string;
    public auth_token: string;

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
        //this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`; //to work with json-server
        //this.baseUrl = baseUrl;//for https
        // console.log(this.baseUrl);
    }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.baseUrl + "api/products");
    }

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.baseUrl + "api/cats"); //api/categories doesn't work with dot net
    }

    saveProduct(product: Product): Observable<Product> {
        return this.http.post<Product>(this.baseUrl + "api/products", product, this.getOptions());
    }

    updateProduct(product: Product): Observable<Product> {
        return this.http.put<Product>(`${this.baseUrl}api/products/${product.id}`, product, this.getOptions());
    }

    deleteProduct(id: string): Observable<Product> {
        return this.http.delete<Product>(`${this.baseUrl}api/products/${id}`, this.getOptions());
    }

    getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(this.baseUrl + "api/orders", this.getOptions());
    }

    saveOrder(order: Order): Observable<Order> {
        return this.http.post<Order>(this.baseUrl + "api/orders", order);
    }

    deleteOrder(id: number): Observable<Order> {
        return this.http.delete<Order>(`${this.baseUrl}api/orders/${id}`, this.getOptions());
    }

    updateOrder(order: Order): Observable<Order> {
        return this.http.put<Order>(`${this.baseUrl}api/orders/${order.id}`, order, this.getOptions());
    }

   

    saveCategory(category: Category): Observable<Category> {
        return this.http.post<Category>(this.baseUrl + "api/cats", category, this.getOptions());
    }

    updateCategory(category: Category): Observable<Category> {
        return this.http.put<Category>(`${this.baseUrl}api/cats/${category.id}`, category, this.getOptions());
    }

    deleteCategory(id: string): Observable<Category> {
        return this.http.delete<Category>(`${this.baseUrl}api/cats/${id}`, this.getOptions());
    }

    authenticate(user: string, pass: string): Observable<boolean> {
        return this.http.post<any>(this.baseUrl + "api/account/login", {
            username: user, password: pass
        }).pipe(map(response => {
            this.auth_token = response.success ? response.access_token : null;
            return response.success;
        }));
    }

    private getOptions() {
        return {
            params: {},
            headers: new HttpHeaders({
                "Authorization": `Bearer ${this.auth_token}`
            })
        }
    }
}