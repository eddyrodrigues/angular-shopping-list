import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { RecipesService } from '../recipe-list.service';
import { Recipe } from '../recipe.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
    name: new FormControl('', Validators.required),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
    ]),
    id: new FormControl(0),
  });

  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService,
    private router: Router
  ) {}
  suggesteName() {
    this.recipeReactiveForm.patchValue({
      name: 'SuggestedName',
    });
  }
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
    console.log();
    if (this.recipeReactiveForm.status === 'VALID') {
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
        this.newEditRecipe = Object.assign(
          this.newEditRecipe,
          this.recipeReactiveForm.value
        );
        this.recipesService.SaveRecipe(this.newEditRecipe);
        this.recipesService.modifiedRecipeSubject.next(this.newEditRecipe);
      }
    }
    this.router.navigate(['/recipes/' + this.newEditRecipe.id]);
  }

  CancelEditAndExit() {
    if (this.recipeReactiveForm.touched) {
      if (confirm('Are you sure you wanna discard the changes?') === false) {
        return;
      }
    }
    this.router.navigate(['/recipes/' + this.newEditRecipe.id]);
  }
}
