import { IResponsePokedex } from 'src/interfaces';

export class Pokedex {
  public name: string;
  public url: string;

  constructor(obj?: IResponsePokedex) {
    if (obj) {
      this.name = obj.name;
      this.url = obj.url;
    }
  }
}
