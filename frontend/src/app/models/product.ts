export class Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  qty: number;

  constructor(_id: string = null, name: string, description: string = '', price: number = 0, image: string, qty = 1) {
    this._id = _id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.image = image;
    this.qty = qty;
  }
}
