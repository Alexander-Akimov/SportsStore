import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { AdminComponent } from "./admin.component";
import { AuthGuard } from './auth.guard';
import { ModelModule } from '../model/model.module';
import { ProductEditorComponent } from './productEditor.component';
import { ProductTableComponent } from './productTable.component';
import { OrderTableComponent } from './orderTable.component';
import { CategoryTableComponent } from './categoryTable.component';
import { CategoryEditorComponent } from './categoryEditor.component';

let routing = RouterModule.forChild([
    { path: "auth", component: AuthComponent },
    {
        path: "main", component: AdminComponent, canActivate: [AuthGuard],
        children: [
            { path: "products/:mode/:id", component: ProductEditorComponent },
            { path: "products/:mode", component: ProductEditorComponent },
            { path: "products", component: ProductTableComponent },
            { path: "categories/:mode/:id", component: CategoryEditorComponent },
            { path: "categories/:mode", component: CategoryEditorComponent },
            { path: "categories", component: CategoryTableComponent },
            { path: "orders", component: OrderTableComponent },
            { path: "**", redirectTo: "products" }
        ]
    },
    { path: "**", redirectTo: "auth" }
]);

@NgModule({
    imports: [ModelModule, CommonModule, FormsModule, routing],
    providers: [AuthGuard],
    declarations: [AuthComponent, AdminComponent,
        ProductTableComponent, ProductEditorComponent, 
        CategoryTableComponent, CategoryEditorComponent,
        OrderTableComponent]
})
export class AdminModule { }