import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartpageComponent } from './startpage/startpage.component';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeViewComponent } from './recipe-view/recipe-view.component';
import { RecipeEditorComponent } from './recipe-editor/recipe-editor.component';
import { AuthService } from './auth.service';

// AuthService implements an interface called "CanActivate" which is used by the Router to
// check whether or not the path is navigable.
const routes: Routes = [
  { path: '', component: StartpageComponent },
  { path: 'ingredient', component: IngredientListComponent, canActivate: [ AuthService ] },
  { path: 'recipe', component: RecipeListComponent, canActivate: [ AuthService ] },
  { path: 'recipe/create', component: RecipeEditorComponent, canActivate: [ AuthService ] },
  { path: 'recipe/:id', component: RecipeViewComponent, canActivate: [ AuthService ] }
 ];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  declarations: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
