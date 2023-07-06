import { Injectable } from "@angular/core";
import {
    Resolve,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from "@angular/router";

import { Product } from "../models/product.model";
import { DataService } from "./data.service";


@Injectable({ providedIn: 'root' })

export class ProductResolverService implements Resolve<Product[]> {
    constructor(
        private _dataService: DataService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this._dataService.loadProducts();
    }
}