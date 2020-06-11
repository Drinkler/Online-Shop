export class Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;

  constructor(_id: string, name: string, description: string = '', price: number = 0, imageUrl: string = 'https://ih1.redbubble.net/image.449121551.2876/st,small,507x507-pad,600x600,f8f8f8.u3.jpg') {
    this._id = _id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;
  }
}
