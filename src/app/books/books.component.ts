import { Component, OnInit } from '@angular/core';
import { BookModel } from './book.model'
import { BooksService } from '../books.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: BookModel[] = [];
  constructor(private bookservice: BooksService, private _router: Router, public _auth: AuthService) { }

  ngOnInit(): void {
    this.bookservice.getBooks().subscribe((data) => {
      this.books = JSON.parse(JSON.stringify(data));
    })
  }

  deleteBook(title: any) {
    console.log(title);
    this.bookservice.deleteBook(title)
    .subscribe((data) => {
      console.log(data)
    this._router.navigate(['/books']);
    window.location.reload();
    })
  }

  logoutUser() {
    localStorage.removeItem('token');
    this._router.navigate([''])
  }

}
