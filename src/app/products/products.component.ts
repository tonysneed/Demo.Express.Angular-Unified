import { Component, OnInit } from "@angular/core";
import { Product } from "../models/product";
import { ProductService } from "./products.service";

@Component({
    moduleId: module.id,
    selector: "my-products",
    templateUrl: "products.component.html"
})
export class ProductsComponent implements OnInit {

    title: string = "Products";
    products: Product[];
    error: any;

    constructor(private _productService: ProductService) { }

    ngOnInit() {
        // Moved to ProductService
        // this.products = [
        //     new Product("Product 1", 10),
        //     new Product("Product 2", 20),
        // ];

        // Replaced with promise-based version
        // this.products = this._productService.getProducts();

        // Call promise-based version of getProducts
        this._productService.getProducts()
            .then(products => this.products = products)
            .catch(error => this.error = error);
     }
}