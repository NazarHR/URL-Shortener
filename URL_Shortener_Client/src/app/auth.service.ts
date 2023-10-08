import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl:string=environment.authBaseUrl;
  constructor(private http: HttpClient) { }
  signUp(userObj:any)
  {
    return this.http.post<any>(this.baseUrl+"/register",userObj)
  }
  login(userObj:any)
  {
    return this.http.post<any>(this.baseUrl+"/authenticate",userObj)
  }
}
