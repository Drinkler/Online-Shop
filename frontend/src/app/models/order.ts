import {Product} from './product';
import {User} from './user';

export class Order {
  products: Product[];
  id: string;
  user: User;
  createdAt: string;
  updatedAt: string;
}
