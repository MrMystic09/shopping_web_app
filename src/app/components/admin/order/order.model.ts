import { Cart } from "src/app/models/cart.mocel";

export class Order {
    public firstName: string;
    public lastName: string;
    public phoneNumber: number;
    public totalPrice: number;
    public cartProducts: Cart[];

constructor(firstName: string, lastName: string, phoneNumber: number, totalPrice: number, cartProducts: Cart[]) {
 this.firstName = firstName;
 this.lastName = lastName;
 this.phoneNumber = phoneNumber;
 this.totalPrice = totalPrice;
 this.cartProducts = cartProducts;
}
}
