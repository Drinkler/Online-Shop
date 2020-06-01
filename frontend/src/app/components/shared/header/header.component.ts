import { Component, OnInit } from '@angular/core';
import { MDBModalRef, MDBModalService } from "angular-bootstrap-md";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  modalLogin: MDBModalRef

  constructor(private modalService: MDBModalService) { }

  ngOnInit(): void {
  }

  /*
  openLoginModal() {
    this.modalLogin = this.modalService.show(LoginComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-lg',
      containerClass: 'top',
      animated: true
    });
  }

  openCartModal() {
    this.modalCart = this.modalService.show(ShoppingcartComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-full-height modal-right',
      containerClass: 'right',
      animated: true
    });
  }
   */
}
