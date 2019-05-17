import { Injectable } from "@angular/core";
import Product from "./product.model";
import { RestDataSource } from './rest.datasource';
import Category from './category.model';
// import { Observable } from "rxjs";
// import { map } from "rxjs/operators";

@Injectable()
export class ProductRepository {

    private products: Product[] = [];
    private categories: Category[] = [];
    private errors = {};

    constructor(private dataSource: RestDataSource) {
        // this.loadData();
    }

    private setCategory(prod: Product): Product {
        prod.categoryId = prod.category.id;
        return prod;
    }

    loadData() {
        // this.products = [];
        // this.categories = [];
        this.dataSource.getProducts()//.pipe(map(p => p))
            .subscribe(products => {
                this.products = products.map(this.setCategory);
            }, error => {
                this.errors = error;
            });

        this.dataSource.getCategories()
            .subscribe(categories => {
                //console.log(categories);
                this.categories = categories;
            }, error => {
                this.errors = error;
            });
    }

    getProducts(category: string = null): Product[] {
        return this.products
            .filter(p => category == null || category == p.category);
    }

    getProduct(id: string): Product {
        return this.products.find(p => p.id == id);
    }

    saveProduct(product: Product) {
        if (product.id == null || product.id == "") {
            this.dataSource.saveProduct(product)
                .subscribe(p => {
                    console.log(p);
                    this.products.push(p);
                });
        } else {
            this.dataSource.updateProduct(product)
                .subscribe(p => {
                    this.products.splice(this.products
                        .findIndex(p => p.id == product.id), 1, p);
                });
        }
    }

    deleteProduct(id: string) {
        this.dataSource.deleteProduct(id).subscribe(p => {
            this.products.splice(this.products
                .findIndex(p => p.id == id), 1);
        })
    }

    saveCategory(category: Category) {
        if (category.id == null || category.id == "") {
            this.dataSource.saveCategory(category)
                .subscribe(p => this.categories.push(p));
        } else {
            this.dataSource.updateCategory(category)
                .subscribe(c => {
                    let index = this.categories.findIndex(c => c.id == category.id);
                    this.categories.splice(index, 1, c);
                });
        }
    }

    getCategories(): Category[] {
        return this.categories;
    }

    getCategory(categoryId: string): Category {
        return this.categories.find(c => c.id == categoryId);
    }

    deleteCategory(id: string) {
        this.dataSource.deleteCategory(id)
            .subscribe(c => {
                this.categories.splice(this.categories.findIndex(c => c.id == id), 1);
            }, error => { console.log(error); });
        //console.log("delete category by id: " + id);
    }
}