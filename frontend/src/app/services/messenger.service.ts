import {Injectable, Input} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Product} from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  subject = new Subject();

  constructor() {
  }

  sendMsg(product) {
    this.subject.next(product);
  }

  getMsg() {
    return this.subject.asObservable();
  }


}
