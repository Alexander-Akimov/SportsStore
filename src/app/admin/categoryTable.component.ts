import { Component, OnInit } from "@angular/core";
import Category from '../model/category.model';
import { ProductRepository } from '../model/product.repository';

@Component({
    templateUrl: "categoryTable.component.html"
})
export class CategoryTableComponent implements OnInit {

    constructor(private repository: ProductRepository) { }

    get categories(): Category[] {
        return this.repository.getCategories();
    }

    deleteCategory(id: string) {
        this.repository.deleteCategory(id);
    }

    ngOnInit(): void {
        this.repository.loadData();
    }
}