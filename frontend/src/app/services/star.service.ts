import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

export interface Star {
  userId: any;
  productId: any;
  value: number;
}

@Injectable({
  providedIn: 'root'
})
export class StarService {

  constructor() {
  }

  setStar(userId: any, productId: any, value: any) {
    console.log(userId, productId, value);
  }
}
