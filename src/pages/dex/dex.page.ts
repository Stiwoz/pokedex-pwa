import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokedex, Pokemon } from 'src/models';
import { switchMap } from 'rxjs/operators';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-dex',
  templateUrl: './dex.page.html',
  styleUrls: ['./dex.page.scss'],
})
export class DexPage implements OnInit {
  public dexName: Pokedex['name'];
  public pokemonList: Pokemon[];

  constructor(private route: ActivatedRoute, private router: Router, private api: ApiService) {}

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap(params => {
          this.dexName = params['pkdx'];
          return this.api.getPaginatedPokemonList(this.dexName);
        })
      )
      .subscribe(list => (this.pokemonList = list));
  }

  openPokemonDetail(pkmn: Pokemon) {
    this.router.navigate(['home', 'dex', this.dexName, 'pokemon', pkmn.name]);
  }
}
