import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './model/user';
import { CanActivate, Router } from '@angular/router';
import { Observable, ReplaySubject, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators'; 

interface AuthResponse {
  ok: boolean;
  message: string;
  user: User;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  private serverUrl = "http://localhost:3000";

  private currentUser : User | null = null;
  private currentToken : string | null = null;

  private currentUserSubject : ReplaySubject<User> = new ReplaySubject();

  constructor(private httpClient: HttpClient, private router: Router) { 

    // Load the user object from local storage, if available
    let serializedUser = window.localStorage["user"];
    if (typeof serializedUser !== "undefined") {
      this.currentUser = JSON.parse(serializedUser);

      this.currentUserSubject.next(this.currentUser);
    }

    // Load the token from local storage when possible
    let token = window.localStorage["token"];
    if (typeof token !== "undefined") {
      this.currentToken = token;
    }
  }

  /**
   * Returns an Options object for use with the angular HTTP client, which has the Token
   * header preset based on current authentication status.
   */
  getOptions() {
    return {
      headers: new HttpHeaders({
        "Token": this.currentToken
      })
    };
  }

  /**
   * The URL to the backend API
   * 
   * This is used by other services.
   */
  getServerUrl() : string {
    return this.serverUrl;
  }

  /**
   * An observable of the current user, used by components to monitor login status.
   */
  getCurrentUser() : Observable<User> {
    return this.currentUserSubject;
  }

  /**
   * Attempt to login using the provided credentials
   * 
   * @param email
   * @param password 
   */
  tryAuth(email: string, password: string) : Observable<AuthResponse> {
    const credentials = {
      email: email,
      password: password
    };

    return this.httpClient.post<AuthResponse>(this.serverUrl + "/auth", credentials)

      // Here we "intercept" the response before passing it on to the caller, by using
      // pipe with the mergeMap operator, and wrapping the result in a new subscribable
      // at the end.
      .pipe(mergeMap(res => {
        // We take no action when authentication fails. The response object is wrapped and passed
        // to the subscriber.
        if (!res.ok) {
          return of(res);
        }

        // Save login state in the service.
        this.currentUser = res.user;
        this.currentToken = res.token;

        // Also save the state persistently in local storage
        window.localStorage["user"] = JSON.stringify(res.user);
        window.localStorage["token"] = res.token;

        // Notify subscriber of the user 
        this.currentUserSubject.next(this.currentUser);

        return of(res);
      }));
  }

  logout() {
      delete window.localStorage["user"];
      delete window.localStorage["token"];
      this.currentToken = null;
      this.currentUser = null;

      this.currentUserSubject.next(null);
  }

  getCurrentToken() : string {
    return this.currentToken;
  }

  isAuthenticated() : boolean {
    return this.currentToken != null;
  }

  canActivate(): boolean {
    if (!this.isAuthenticated()) {
      this.router.navigate(['startpage']);
      return false;
    }
    return true;
  }
}
