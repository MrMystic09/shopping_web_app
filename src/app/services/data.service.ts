import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { StoreService } from "./store.service";
import { Product } from "../models/product.model";
import { map, tap } from "rxjs";



@Injectable({ providedIn: 'root' })

export class DataService {


    constructor(
        private http: HttpClient,
        private _storeService: StoreService) { }

    storeProducts() {
        const products = this._storeService.getProducts();
        this.http.put(
            'https://shopping-web-app-37eb9-default-rtdb.europe-west1.firebasedatabase.app/products.json',
            products
        )
            .subscribe(response => {
                console.log(response)
            });
    }

    loadProducts() {
        return this.http.get<Product[]>(
            'https://shopping-web-app-37eb9-default-rtdb.europe-west1.firebasedatabase.app/products.json'
        )
            .pipe(
                map(products => {
                    return products
                }),
                tap(products => {
                    this._storeService.setProducts(products);
                })
            )
    }

}