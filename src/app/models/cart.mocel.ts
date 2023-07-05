export class Cart {
    public name: string;
    public picture: string;
    public shortDescription: string;
    public price: number;
    public quantity: number;
    public productId: number;
    public totalProductPrice: number;


constructor(pic: string, name: string, shortDesc: string, price: number, quantity: number, productId: number, totalProductPrice: number) {
 this.picture = pic;
 this.name = name;
 this.shortDescription = shortDesc;
 this.price = price;
 this.quantity = quantity;
 this.productId = productId;
 this.totalProductPrice = totalProductPrice;
}
}
