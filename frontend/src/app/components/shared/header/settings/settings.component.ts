import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountService} from 'src/app/services/account.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService
  ) {
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      surname: ['', Validators.required],
      lastname: ['', Validators.required],
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      repeatNewPassword: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    if (this.form.invalid) {
      return;
    }

    console.log({
      email: this.f.email.value,
      name: {first: this.f.surname.value, last: this.f.lastname.value},
      password: this.f.newPassword.value,
      admin: false
    });

    this.accountService.update(localStorage.getItem('user')['userId'],
      {
        email: this.f.email.value,
        name: {first: this.f.surname.value, last: this.f.lastname.value},
        password: this.f.newPassword.value,
        admin: false
      });
  }
}
