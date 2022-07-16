import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-newbook',
  templateUrl: './newbook.component.html',
  styleUrls: ['./newbook.component.css']
})
export class NewbookComponent implements OnInit {

  constructor(private _router: Router, private _bookservice: BooksService) { }
  newBookForm!: FormGroup
  ngOnInit(): void {
    this.newBookForm = new FormGroup({
      title: new FormControl('Book title', Validators.compose(
                            [Validators.required, Validators.maxLength(75)])),
      author: new FormControl('Author', Validators.compose(
                            [Validators.required,Validators.maxLength(50)])),
      about: new FormControl('about', Validators.compose(
                            [Validators.required, Validators.maxLength(250)]))
    })
  }

  logoutUser() {
    localStorage.removeItem('token');
    this._router.navigate([''])
  }

  onSubmit(value: any){
    console.log(value);
    this._bookservice.addNewBook(value)
    .subscribe((data) => {
      let status = data.status;
      console.log(data)
      if(!status) {
        alert("Book already exists");
        this._router.navigate(['/addbook']);
      }
      else {
        this._router.navigate(['/books'])
      }
    })

  }
}
