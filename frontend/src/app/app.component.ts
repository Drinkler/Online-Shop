import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AccountService} from 'src/app/services/account.service';
import {User} from 'src/app/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  user: User;
  title = 'Online-Shop';

  constructor(
    private router: Router,
    private accountService: AccountService
  ) {
    this.accountService.user.subscribe(x => this.user = x);
  }

  logout() {
    this.accountService.logout();
  }
}
