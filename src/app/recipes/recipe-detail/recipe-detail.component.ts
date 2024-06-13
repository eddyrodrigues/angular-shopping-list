import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { ActivatedRoute, Data } from '@angular/router';
import { RecipesService } from '../recipe-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  constructor(
    private shoppingListService: ShoppingListService,
    private recipesService: RecipesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((c: Data) => {
      this.recipe =
        this.recipesService.getRecipes().filter((r) => r.id == c['id'])[0] ??
        null;
    });
  }

  addToShoppingList() {
    this.shoppingListService.AddIngridients(this.recipe.ingridients);
  }
}
