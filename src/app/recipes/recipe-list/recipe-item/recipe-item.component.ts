import { Component, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipesService } from '../../recipe-list.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css',
})
export class RecipeItemComponent {
  @Input({ alias: 'recipeItem' }) recipeItem: Recipe;
  constructor(private RecipesService: RecipesService) {}
}
