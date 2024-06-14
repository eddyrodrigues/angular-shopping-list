import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import Ingridient from '../shopping-list/ingridient.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipesService {
  addedRecipeSubject = new Subject<void>();
  modifiedRecipeSubject = new Subject<Recipe>();
  recipes: Recipe[] = [
    new Recipe(
      'Bolo de Banana',
      'Recipe Description Test',
      'https://www.eatingwell.com/thmb/LH-H61DAD-1Q3AgeN89BkrWKNEk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Chicken-piccata-casserole-3x2-167-f44730f489cc4b9493547de1c76a3b93.jpg',
      [new Ingridient('Ing 1', 11)],
      1
    ),
    new Recipe(
      'Macarrao ao molho branco',
      'Recipe Description Test',
      'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2021/07/minecraft-item-frame-crafting-recipe.jpg?q=50&fit=crop&w=1500&dpr=1.5',
      [new Ingridient('Sticks', 8), new Ingridient('Leather', 1)],
      2
    ),
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  getById(id: number) {
    return this.recipes.filter((r) => r.id == id)[0];
  }

  AddRecipe(recipe: Recipe) {
    recipe.id = this.recipes[this.recipes.length - 1].id + 1;
    this.recipes.push(recipe);
  }

  SaveRecipe(newRecipe: Recipe) {
    let recipe: Recipe = this.recipes.find((c) => c.id == newRecipe.id);
    recipe = newRecipe;
  }
}
