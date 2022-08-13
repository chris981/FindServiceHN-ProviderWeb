import { Injectable } from "@angular/core";
import { LocalStoreService } from "./local-store.service";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { delay, map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  //Only for demo purpose
  authenticated = true;
  baseUrl = environment.baseUrl;

  constructor(private store: LocalStoreService, private router: Router, private httpClient: HttpClient) {
    this.checkAuth();
  }

  checkAuth() {
    const user = this.store.getItem('user');
    if(user) {
      this.authenticated = true;
    } else{ 
      this.authenticated = false;
    }
  }

  getuser() {
    return of({});
  }

  signin(username: string, password: string) {
    return this.httpClient.post<any>(`${this.baseUrl}/api/auth/authenticate`, { username, password })
            .pipe(map(user => {
                localStorage.setItem('user', JSON.stringify(user));
                this.authenticated = true;
                return user;
            }));
  }

  signout() {
    this.authenticated = false;
    this.store.removeItem("user");
    this.router.navigateByUrl("/sessions/signin");
  }
}
