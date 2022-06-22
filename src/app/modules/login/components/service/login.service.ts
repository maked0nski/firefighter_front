import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private accessToken = 'access'

  constructor(private httpClient: HttpClient) {
  }

  login() {

  }

  getToken() {

  }

  setToken() {

  }

  isAuth() {

  }

  deleteToken() {

  }
}
