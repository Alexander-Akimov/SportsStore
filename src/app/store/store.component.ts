import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import Product from "../model/product.model";
import { ProductRepository } from "../model/product.repository";
import { Cart } from '../model/cart.model';
import Category from '../model/category.model';

@Component({
    selector: "store",
    templateUrl: "store.component.html"
})
export class StoreComponent implements OnInit {
    public selectedCategory = null;
    public productsPerPage = 4;
    public selectedPage = 1;
    // public valueType;

    constructor(private repository: ProductRepository, private cart: Cart, private router: Router) { }

    get products(): Product[] {
        // console.log('produts getter called')        
        let pageIndex = (this.selectedPage - 1) * this.productsPerPage
        return this.repository.getProducts(this.selectedCategory)
            .slice(pageIndex, pageIndex + this.productsPerPage);
    }

    get categories(): Category[] {
        return this.repository.getCategories();
    }

    changeCategory(newCategory?: string) {
        this.selectedCategory = newCategory;
    }

    changePage(newPage: number) {
        this.selectedPage = newPage;
    }

    changePageSize(newSize: number) {
        //console.log('--------');// dosn't work
        // this.valueType = Number(newSize);
        // console.log(this.valueType);
        this.productsPerPage = Number(newSize);
        this.changePage(1);
    }

    // get pageNumbers(): number[] {
    //     return Array(Math.ceil(this.repository
    //         .getProducts(this.selectedCategory).length / this.productsPerPage))
    //         .fill(0).map((x, i) => i + 1);
    // }

    get pageCount(): number {
        return Math.ceil(this.repository
            .getProducts(this.selectedCategory).length / this.productsPerPage);
    }

    addProductToCart(product: Product) {
        this.cart.addLine(product);
        this.router.navigateByUrl("/store/cart");
    }

    ngOnInit() {
        this.repository.loadData();
    }
}