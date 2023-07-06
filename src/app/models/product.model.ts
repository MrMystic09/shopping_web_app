export class Product {
    public name: string;
    public picture: string;
    public shortDescription: string;
    public description: string;
    public price: number;



constructor(pic: string, name: string, shortDesc: string, desc: string, price: number) {
 this.picture = pic;
 this.name = name;
 this.shortDescription = shortDesc;
 this.description = desc;
 this.price = price;
}
}
