import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, first } from 'rxjs/operators';
import { Pokedex } from 'src/models';
import { Pokemon } from 'src/models/pokemon';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  private api = 'https://pokeapi.co/api/v2/';

  public getPaginatedPokemonList(dexName: Pokedex['name']): Observable<Pokemon[]> {
    return this.http.get<any>(this.api + 'pokedex/' + dexName).pipe(
      first(),
      map(response => response.pokemon_entries.map(p => new Pokemon(p)))
    );
  }

  public getPaginatedPokedexList(): Observable<Pokedex[]> {
    return this.http.get<any>(this.api + 'pokedex').pipe(
      first(),
      map(response => response.results.map(e => new Pokedex(e)))
    );
  }
}
