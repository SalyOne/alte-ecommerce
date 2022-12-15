import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IAuth, IAuthResponse} from "../interfaces/auth.interface";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseAuthUrl?: string;
  apiKey?: string;

  get isAuth():boolean{
    return !!localStorage.getItem('token')
  }
  get email():string{
    return localStorage.getItem('email') || '';
  }

  constructor(
    private http:HttpClient
  ) {
    this.firebaseAuthUrl = environment.firebaseAuthUrl;
    this.apiKey = environment.apiKey;
  }

  signUp(params: IAuth):Observable<IAuthResponse>{
    return this.http.post<IAuthResponse>(`${this.firebaseAuthUrl}signUp?key=${this.apiKey}`,params)
      .pipe(
        tap((authResponse:IAuthResponse)=>{
          this.setAuth(authResponse)
        })
      )
  }
  signIn(params: IAuth):Observable<IAuthResponse>{
    return this.http.post<IAuthResponse>(`${this.firebaseAuthUrl}signInWithPassword?key=${this.apiKey}`,params)
      .pipe(
        tap((authResponse:IAuthResponse)=>{
          this.setAuth(authResponse)
        })
      )
  }

  setAuth(authResponse:IAuthResponse):void{
    localStorage.setItem('token', authResponse.idToken)
    localStorage.setItem('refreshToken', authResponse.refreshToken)
    localStorage.setItem('email', authResponse.email)
  }

  logout():void{
      localStorage.clear()
  }
}
