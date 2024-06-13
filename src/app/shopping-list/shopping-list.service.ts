import { EventEmitter, Injectable } from '@angular/core';
import Ingridient from './ingridient.model';
import { Subject } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class ShoppingListService {
  private ingList: Ingridient[] = [];

  ingridientsChanged = new Subject<Ingridient[]>();

  AddIngridient(Ingridient: Ingridient): void {
    this.ingList.push(Ingridient);
    this.ingridientsChanged.next(this.ingList.slice());
  }

  AddIngridients(Ingridient: Ingridient[]): void {
    this.ingList = this.ingList.concat(Ingridient);
    this.ingridientsChanged.next(this.ingList.slice());
  }

  getIngridients(): Ingridient[] {
    return this.ingList.slice();
  }
}
