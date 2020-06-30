import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Product} from '../../models/product';
import {ProductService} from '../../services/product.service';

@Injectable()
export class ProductResolve implements Resolve<Product> {

  constructor(private productService: ProductService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.productService.getProduct(route.paramMap.get('id'));
  }
}
