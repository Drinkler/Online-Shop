import {Component, OnInit} from '@angular/core';
import {AccountService} from 'src/app/services/account.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
    this.accountService.user.subscribe((user) => {
      this.isLoggedIn = !!user;
    });
  }

  logout(): void {
    this.accountService.logout();
  }

}
