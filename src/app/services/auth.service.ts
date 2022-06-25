import {Injectable} from '@angular/core';
import {TokenInterface} from "../modules/login/interfaces";
import {Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {urls} from "../constants";
import {TokenStorageService} from "./token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private accessTokenKey = 'access_token'

  constructor(private httpClient: HttpClient, private tokenStorageService:TokenStorageService) {
  }

  isAuthorization(): boolean {
    return !!localStorage.getItem(this.accessTokenKey)
  }

  refrashTokens(): Observable<TokenInterface> {
    const refresh_token = this.tokenStorageService.getRefreshAccessToken();
    return this.httpClient.post<TokenInterface>(urls.refresh, {refresh_token}).pipe(
      tap((tokens:TokenInterface) => {
        this.tokenStorageService.setToken(tokens)
      })
    )
  }
}
