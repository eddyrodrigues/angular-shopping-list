import { Component, OnInit } from '@angular/core';
import { RecipesService } from './recipe-list.service';
import { Recipe } from './recipe.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe = null;
  constructor(
    private recipeService: RecipesService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.selectedRecipe =
      this.recipeService
        .getRecipes()
        .filter((r) => r.id == this.route.snapshot.params['id'])[0] ?? null;
  }
}
