import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private accessTokenKey = 'access_token'

  constructor() { }

  isAuthorization(): boolean {
    return !!localStorage.getItem(this.accessTokenKey)
  }
}
