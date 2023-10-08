import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from "@angular/router";
import { AppComponent } from './app.component';
import { ShortUrlTableComponent } from './short-url-table/short-url-table.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule} from "@angular/common/http";
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { RedirectComponent } from './redirect/redirect.component';
import { AddUrlComponent } from './add-url/add-url.component';
import { ShortURLInfoComponent } from './short-urlinfo/short-urlinfo.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RegisterComponent } from './register/register.component';
@NgModule({
  declarations: [
    AppComponent,
    ShortUrlTableComponent,
    AboutComponent,
    LoginComponent,
    RedirectComponent,
    AddUrlComponent,
    ShortURLInfoComponent,
    NotFoundComponent,
    NavBarComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
