import { Injectable } from '@angular/core';
import { Recipe } from './model/recipe';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  serverUrl : string;

  constructor(private httpClient: HttpClient, private authService: AuthService) { 
    this.serverUrl = authService.getServerUrl();
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.httpClient.get<Recipe[]>(this.serverUrl + "/recipe", this.authService.getOptions());
  }

  fetchRecipe(id): Observable<Recipe> {
    return this.httpClient.get<Recipe>(this.serverUrl + "/recipe/" + id, this.authService.getOptions());
  }

  createRecipe(recipe: Recipe) : Observable<Recipe> {
    return this.httpClient.post<Recipe>(this.serverUrl + "/recipe", recipe, this.authService.getOptions());
  }
}
