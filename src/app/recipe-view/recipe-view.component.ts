import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../model/recipe';
import { Subscription } from 'rxjs';

@Component({
  selector: 'tnc-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.css']
})
export class RecipeViewComponent implements OnInit, OnDestroy {

  recipe: Recipe | null;

  subscription: Subscription;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get("id");
    this.subscription = this.recipeService.fetchRecipe(id)
      .subscribe(recipe => this.recipe = recipe);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
