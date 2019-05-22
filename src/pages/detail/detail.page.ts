import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  public pkmnName: string;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(p => (this.pkmnName = p['pkmn']));
  }
}
