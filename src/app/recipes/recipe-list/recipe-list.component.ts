import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipesService } from '../recipe-list.service';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params, Router, Routes } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  searchForText: String;
  addedRecipeEventSub: Subscription;
  constructor(
    private recipesServices: RecipesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    this.addedRecipeEventSub.unsubscribe();
  }
  refreshRecipes() {
    this.recipes = this.recipesServices.getRecipes();
  }
  ngOnInit(): void {
    this.refreshRecipes();
    this.addedRecipeEventSub =
      this.recipesServices.addedRecipeSubject.subscribe((c) => {
        this.refreshRecipes();
      });

    this.route.queryParams.subscribe((params: Params) => {
      console.log(params);
      if (params['recipename']) {
        this.recipes = this.recipesServices
          .getRecipes()
          .filter((c) =>
            c.name.toLowerCase().includes(params['recipename'].toLowerCase())
          );
      }
    });
  }

  onSearchForName() {
    console.log(this.searchForText);
    if (this.searchForText) {
      this.router.navigate(['/recipes'], {
        queryParams: {
          recipename: this.searchForText,
        },
      });
    } else {
      this.router.navigate(['/recipes']);
    }
  }
}
