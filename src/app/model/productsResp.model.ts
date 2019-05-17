import Product from "./product.model";
import Category from './category.model';

export class ProductsResp {
    constructor(
        public products?: Product[],
        public categories?: Category[]) { }
}