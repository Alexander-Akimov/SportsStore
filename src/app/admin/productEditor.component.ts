import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
import Product from "../model/product.model";
import { ProductRepository } from "../model/product.repository";
import Category from '../model/category.model';

@Component({
    templateUrl: "productEditor.component.html"
})
export class ProductEditorComponent implements OnInit {

    editing: boolean = false;
    product: Product = new Product();
    private productId: string = "";
    public categories: Category[] = [];
    submitted: boolean = false;

    constructor(private repository: ProductRepository,
        private router: Router,
        activeRoute: ActivatedRoute) {

        this.editing = activeRoute.snapshot.params["mode"] == "edit";
        this.productId = activeRoute.snapshot.params["id"];
    }

    save(form: NgForm) {
        // console.log(this.product.categoryId);
        this.submitted = true;
        if (form.valid) {
            //console.log(this.product);
            this.repository.saveProduct(this.product);
            this.router.navigateByUrl("/admin/main/products");
        } else {
            //this.submitted = false;
        }
    }

    changeCategory(categoryId: string) { // for debug
        console.log(categoryId);
    }
 

    ngOnInit(): void {
        if (this.editing) {
            Object.assign(this.product, this.repository.getProduct(this.productId));
           // console.log(product);
        }
        this.categories = this.repository.getCategories();
    }
}