import {Component, OnInit, ViewChild} from '@angular/core';
import {MDBModalRef} from "angular-bootstrap-md";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private modalRef: MDBModalRef) { }

  ngOnInit(): void {
  }

}
