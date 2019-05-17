import { Component, OnInit } from "@angular/core";
import Category from '../model/category.model';
import { ProductRepository } from '../model/product.repository';

@Component({
    templateUrl: "categoryTable.component.html"
})
export class CategoryTableComponent implements OnInit {

    constructor(private repository: ProductRepository) { }

    deleteCategory(id: string) {
        this.repository.deleteCategory(id);
    }
    
    get categories(): Category[] {
        return this.repository.getCategories();
    }

    ngOnInit(): void {
        this.repository.loadData();
    }
}