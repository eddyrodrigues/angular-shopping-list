import Ingridient from '../shopping-list/ingridient.model';

export class Recipe {
  public name: string;
  public description: string;
  public imgPath: string;
  public ingridients: Ingridient[];
  public id: number;

  constructor(
    name: string,
    description: string,
    imgPath: string,
    ingridients: Ingridient[],
    id: number
  ) {
    this.name = name;
    this.description = description;
    this.imgPath = imgPath;
    this.ingridients = ingridients;
    this.id = id;
  }
}
