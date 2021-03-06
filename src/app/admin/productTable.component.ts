import { Component, OnInit } from "@angular/core";
import Product from "../model/product.model";
import { ProductRepository } from "../model/product.repository";

@Component({
    templateUrl: "productTable.component.html"
})
export class ProductTableComponent implements OnInit {

    constructor(private repository: ProductRepository) { }

    get products(): Product[] {
        return this.repository.getProducts();
    }

    deleteProduct(id: string) {
        this.repository.deleteProduct(id);
    }

    ngOnInit(): void {
        this.repository.loadData();
    }
}