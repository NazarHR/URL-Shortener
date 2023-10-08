import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {ShortUrlTableComponent} from './short-url-table/short-url-table.component'
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { RedirectComponent } from './redirect/redirect.component';
import { ShortURLInfoComponent } from './short-urlinfo/short-urlinfo.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';

const routes:Routes=[
  { path: '', redirectTo: '/short-url-table', pathMatch: 'full' },
  {path:'short-url-table',component:ShortUrlTableComponent},
  {path:'about',component:AboutComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'404',component:NotFoundComponent},
  {path:'short-url-info/:id',component:ShortURLInfoComponent},
  {path:':shortLink',component:RedirectComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
