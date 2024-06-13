import { Component, OnDestroy, OnInit } from '@angular/core';
import Ingridient from './ingridient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingList: Ingridient[] = [];
  ingridiendChangedSubs: Subscription;

  constructor(private shoppingService: ShoppingListService) {}

  ngOnDestroy(): void {
    this.ingridiendChangedSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.ingList = this.shoppingService.getIngridients();
    this.ingridiendChangedSubs =
      this.shoppingService.ingridientsChanged.subscribe((ingridients) => {
        this.ingList = ingridients;
      });
  }
}
