import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
import { ProductRepository } from "../model/product.repository";
import Category from '../model/category.model';

@Component({
    templateUrl: "categoryEditor.component.html"
})

export class CategoryEditorComponent implements OnInit {
    
    editing: boolean = false;
    category: Category = new Category();
    submitted: boolean = false;
    private categoryId: string = "";

    constructor(private repository: ProductRepository,
        private router: Router,
        activeRoute: ActivatedRoute) {

        this.editing = activeRoute.snapshot.params["mode"] == "edit";
        this.categoryId = activeRoute.snapshot.params["id"];      
    }

    save(form: NgForm) {
        // console.log(this.product.categoryId);
        this.submitted = true;
        if (form.valid) {
           // console.log(this.category);
            this.repository.saveCategory(this.category);
            this.router.navigateByUrl("/admin/main/categories");
        }
    }

    ngOnInit(): void {
        if (this.editing) {
            Object.assign(this.category, this.repository.getCategory(this.categoryId));
        }
    }
}