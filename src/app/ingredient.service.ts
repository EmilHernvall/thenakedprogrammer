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

  serverUrl = "http://localhost:3000";

  ingredients: Ingredient[] = [
      /*new Ingredient(1, "Ägg", QT_PCS),
      new Ingredient(2, "Vatten", QT_VOLUME),
      new Ingredient(3, "Mjöl", QT_VOLUME),
      new Ingredient(4, "Mjölk", QT_VOLUME),
      new Ingredient(5, "Salt", QT_VOLUME),
      new Ingredient(6, "Socker", QT_VOLUME),*/
    ];

  ingredientsSubject: ReplaySubject<Ingredient[]> = new ReplaySubject();

  constructor(private httpClient: HttpClient, private authService: AuthService) { 

    // To use local storage:
    // let serializedIngredients = window.localStorage["ingredients"];
    // this.ingredients = typeof serializedIngredients !== "undefined" ? JSON.parse(serializedIngredients) : [];

    this.ingredientsSubject.next(this.ingredients);
  }

  fetchIngredients() : Observable<Ingredient[]> {
    //return this.ingredientsSubject;

    return this.httpClient.get<Ingredient[]>(this.serverUrl + "/ingredient?token=" + this.authService.getCurrentToken());
  }

  createIngredient(ingredient: Ingredient) : Observable<Ingredient> {
    return this.httpClient.post<Ingredient>(this.serverUrl + "/ingredient?token=" + this.authService.getCurrentToken(), ingredient);

    //let lastId = this.ingredients.map(ingredient => ingredient.id).pop() || 0;
    //ingredient.id = lastId + 1;
    //this.ingredients.push(ingredient);

    //this.ingredientsSubject.next(this.ingredients);

    //window.localStorage["ingredients"] = JSON.stringify(this.ingredients);

    //return ingredient;
  }
}