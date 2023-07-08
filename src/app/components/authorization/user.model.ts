import { Cart } from "src/app/models/cart.mocel";

export class User {
    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _tokenExpirationDate: Date,
        public cart: Cart[],
        public favourites: Cart[]) { }
        

    get token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }


}