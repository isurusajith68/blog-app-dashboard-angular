import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostComponent } from './post/post/post.component';
import { AddPostComponent } from './post/add-post/add-post.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  { path: "", component: DashboardComponent },
  { path: "category", component: CategoriesComponent },
  { path: "post", component: PostComponent },
  { path: "post/add", component: AddPostComponent },
  { path: "login", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
