import { Product } from "../models/product";

// Methods return promises to simulate IO-bound operations

export default class ProductsRepository {

    // Array of products
    private _products = [
        new Product("Chai", 1),
        new Product("Espresso", 2),
        new Product("Capuccino", 3),
        new Product("Macchiato", 4),
        new Product("Americano", 5),
        new Product("Flat White", 6),
    ];

    retrieveAll(): Promise<Product[]> {
        return new Promise((resolve, reject) => {
            resolve(this._products);
        });
    }

    retrieve(id: number): Promise<Product> {
        return new Promise((resolve, reject) => {
            if (id < 0 || id > this._products.length) {
                reject(`Invalid id: ${id}`);
            }
            resolve(this._products[id - 1]);
        });
    }

    create(productName: string, unitPrice: number): Promise<Product> {
        return new Promise((resolve, reject) => {
            let product = new Product(productName, unitPrice);
            this._products.push(product);
            resolve(product);
        });
    }

    update(id: number, productName: string, unitPrice: number): Promise<Product> {
        return new Promise((resolve, reject) => {
            if (id < 0 || id > this._products.length) {
                reject(`Invalid id: ${id}`);
            }
            let product = new Product(productName, unitPrice);
            this._products[id - 1] = product;
            resolve(product);
        });
    }

    delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => {
            if (id < 0 || id > this._products.length) {
                reject(`Invalid id: ${id}`);
            }
            this._products.splice(id - 1, 1);
            resolve();
        });
    }
}