import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { RecipesService } from '../recipe-list.service';
import { Recipe } from '../recipe.model';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css',
})
export class RecipeEditComponent implements OnInit {
  // newEditRecipe: Recipe;
  newEditRecipe: Recipe = new Recipe(null, null, null, [], 0);
  isAddingNewRecipe: boolean = true;
  recipeReactiveForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    id: new FormControl(0),
  });

  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.initForm();

    this.route.params.subscribe((data: Data) => {
      if (data['id']) {
        this.newEditRecipe = this.recipesService.getById(data['id']);

        this.recipeReactiveForm.setValue({
          name: this.newEditRecipe.name,
          description: this.newEditRecipe.description,
          id: this.newEditRecipe.id,
        });

        this.isAddingNewRecipe = false;
        console.log(this.recipeReactiveForm, this.newEditRecipe);
      }
    });
  }
  initForm() {}
  onSubmit() {
    console.log(this.recipeReactiveForm);
    if (!this.recipeReactiveForm.errors && this.recipeReactiveForm.dirty) {
      let newRecipe = new Recipe(
        this.recipeReactiveForm.value.name,
        this.recipeReactiveForm.value.description,
        null,
        [],
        0
      );
      if (this.isAddingNewRecipe) {
        this.recipesService.AddRecipe(newRecipe);
        this.recipesService.addedRecipeSubject.next();
      } else {
        this.newEditRecipe.name = newRecipe.name;
        this.newEditRecipe.description = newRecipe.description;
        this.recipesService.SaveRecipe(this.newEditRecipe);
        this.recipesService.modifiedRecipeSubject.next(this.newEditRecipe);
      }
    }
    this.router.navigate(['/recipes/' + this.newEditRecipe.id]);
  }
}
