import { Injectable } from '@angular/core';
import { Ingredient } from './model/ingredient';
import { QT_PCS, QT_VOLUME } from './model/quantity';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  serverUrl : string;

  constructor(private httpClient: HttpClient, private authService: AuthService) { 
    this.serverUrl = authService.getServerUrl();
  }

  fetchIngredients() : Observable<Ingredient[]> {
    return this.httpClient.get<Ingredient[]>(this.serverUrl + "/ingredient", this.authService.getOptions());
  }

  createIngredient(ingredient: Ingredient) : Observable<Ingredient> {
    return this.httpClient.post<Ingredient>(this.serverUrl + "/ingredient", ingredient, this.authService.getOptions());
  }
}