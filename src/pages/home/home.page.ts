import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api.service';
import { Pokedex } from 'src/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [ApiService],
})
export class HomePage implements OnInit {
  public list: Pokedex[] = [];

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.api.getPaginatedPokedexList().subscribe(list => this.list.push(...list));
  }

  public loadDetail(dex: Pokedex) {
    this.router.navigate(['home', 'dex', dex.name]);
  }
}
