import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { RecipesService } from '../recipe-list.service';
import { Recipe } from '../recipe.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css',
})
export class RecipeEditComponent implements OnInit {
  // newEditRecipe: Recipe;
  newEditRecipe: Recipe = new Recipe(null, null, null, [], 0);
  isAddingNewRecipe: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Data) => {
      if (data['id']) {
        this.newEditRecipe = this.recipesService.getById(data['id']);
        this.isAddingNewRecipe = false;
      }
    });
  }
  onSubmit(form: NgForm) {
    let newRecipe = new Recipe(
      form.value['recipeName'],
      form.value['recipeDescription'],
      null,
      [],
      0
    );

    if (this.isAddingNewRecipe) {
      this.recipesService.AddRecipe(newRecipe);
      this.recipesService.addedRecipeSubject.next();
    } else {
      this.recipesService.SaveRecipe(this.newEditRecipe);
      this.recipesService.modifiedRecipeSubject.next(this.newEditRecipe);
    }
  }
}
