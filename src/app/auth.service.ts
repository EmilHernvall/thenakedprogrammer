import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentToken = "zqPnREvYB67ws34NSFVVWjf4UyBufx4D";

  constructor(private httpClient: HttpClient) { }

  getCurrentToken() {
    return this.currentToken;
  }
}
