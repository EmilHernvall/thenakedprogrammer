import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../model/recipe';
import { Subscription } from 'rxjs';

@Component({
  selector: 'tnc-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[];

  subscription : Subscription;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.subscription = this.recipeService.fetchRecipes()
      .subscribe(recipes => this.recipes = recipes);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
