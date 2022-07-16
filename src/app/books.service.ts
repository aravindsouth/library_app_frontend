import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  baseUri: string = "http://localhost:3000/"

  getBooks() {
    return this.http.get(this.baseUri);
  }

  deleteBook(title: any) {
    return this.http.post<any>(this.baseUri+"deletebook", {title: title})
  }

  addNewBook(book: any) {
    return this.http.post<any>(this.baseUri+"addbook", book)
  }
}
