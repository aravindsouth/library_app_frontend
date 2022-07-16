import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private _auth: AuthService, private _router: Router) { }

  form!: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('email', Validators.compose([
      Validators.pattern('^([A-Za-z0-9_\.-]{1,50})@([A-Za-z0-9\-]{2,70})\.([a-z]{2,6})(.[a-z]{2,3})?$'),
      Validators.required
      ])),
      password: new FormControl('password', Validators.compose([
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'),
        Validators.required
      ])),
      password_confirm: new FormControl('password')
    })
  }

 onSubmit(value: any) {
  const user = {
    email: value.email,
    password: value.password
  }
  console.log(value);
  console.log(user)
  this._auth.userSignUp(user)
  .subscribe((data) =>{
    let status = data.status
    console.log(status)
    // this._router.navigate(['login'])
    // alert('New user added')
    if (!status) {
      alert("User already exists")
      this._router.navigate(["/signup"])
      window.location.reload();
    }
    else {
      this._router.navigate(["/login"])
    }
  })

 }

//  confirmPasswordValidator () {
//   if (this.form.get('password') === this.form.get('password_confirm')) {
//     return null;
//   }
//     else {
//       return { password_confirm: true };
//     }
//   }
 }

