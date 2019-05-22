import { IResponsePokemon } from 'src/interfaces';

export class Pokemon {
  public id: number;
  public name: string;
  public url: string;

  constructor(obj?: IResponsePokemon) {
    if (obj) {
      this.id = obj.entry_number;
      this.name = obj.pokemon_species.name;
      this.url = obj.pokemon_species.url;
    }
  }
}
