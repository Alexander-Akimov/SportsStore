import Category from './category.model';

export default class Product {

    constructor(
        public id?: string,
        public name?: string,
        public description?: string,
        public price?: number,
        public categoryId?: string,
        public category?: Category) {
        // categoryId = category.id;
        //console.log("constructor call: " + this);
    }
}