import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';

import Ingridient from '../ingridient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent {
  @ViewChild('ingridientName') ingridientName: ElementRef<HTMLInputElement>;
  @ViewChild('ingridientAmount') ingridientAmount: ElementRef<HTMLInputElement>;
  @Output() ingCreate = new EventEmitter<Ingridient>();

  constructor(private shoppingListService: ShoppingListService) {}
  OnAddIngridient() {
    const ingName = this.ingridientName.nativeElement.value;
    const ingAmount = Number(this.ingridientAmount.nativeElement.value);
    this.shoppingListService.AddIngridient(new Ingridient(ingName, ingAmount));
  }
}
