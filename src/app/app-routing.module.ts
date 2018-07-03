import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StartpageComponent } from './startpage/startpage.component';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeViewComponent } from './recipe-view/recipe-view.component';
import { RecipeEditorComponent } from './recipe-editor/recipe-editor.component';

const routes: Routes = [
  { path: '', component: StartpageComponent },
  { path: 'ingredient', component: IngredientListComponent },
  { path: 'recipe', component: RecipeListComponent },
  { path: 'recipe/create', component: RecipeEditorComponent },
  { path: 'recipe/:id', component: RecipeViewComponent }
 ];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  declarations: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
