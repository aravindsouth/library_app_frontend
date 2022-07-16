import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BooksComponent } from './books/books.component';
import { NewbookComponent } from './newbook/newbook.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [{path:"", component:HomeComponent},
                        {path:"login", component:LoginComponent},
                        {path:"signup", component:SignupComponent},
                        {path:"books", component:BooksComponent, canActivate:[AuthGuard]},
                        {path: "addbook", component: NewbookComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
