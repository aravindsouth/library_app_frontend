import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

constructor(private _auth: AuthService, private _router: Router) {}
  form!: FormGroup;
  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('email', Validators.compose(
        [Validators.pattern('^([A-Za-z0-9_\.-]{1,50})@([A-Za-z0-9\-]{2,70})\.([a-z]{2,6})(.[a-z]{2,3})?$'),
      Validators.required]
      )),
      password: new FormControl('password', Validators.minLength(8))
    });
  }
  invalidCred: boolean = false;
  onSubmit (value: any) {
    // console.log(value);
    this._auth.loginUser(value)
    .subscribe(
      res => {
        localStorage.setItem('token', res.token);
        this._router.navigate(['books']);
        console.log(res.error);
      }
    )
  }

}
