import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from 'src/app/models/user';
import {loginUrl, registerUrl, userUrl} from '../config/api';

@Injectable({providedIn: 'root'})
export class AccountService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(username, password) {
    return this.http.post<any>(loginUrl, {email: username, password: password})
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('userId', user['user']['_id']);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('orderId', user['orderId']);
        this.userSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  updateToAdmin(id) {
    return this.http.patch(`${userUrl}/${id}`, {
      'admin': true
    });
  }

  register(user: User) {
    return this.http.post(registerUrl, user);
  }

  getAll() {
    return this.http.get<User[]>(userUrl);
  }

  getById(id: string) {
    return this.http.get<User>(`${userUrl}/${id}`);
  }

  update(id, params) {
    return this.http.patch(`${userUrl}/${id}`, params);
  }

  delete(id: string) {
    return this.http.delete(`${userUrl}/${id}`)
      .pipe(map(x => {
        // auto logout if the logged in user deleted their own record
        if (id == this.userValue.id) {
          this.logout();
        }
        return x;
      }));
  }

  deleteAllUsers() {
    return this.http.delete(`${userUrl}`);
  }
}
