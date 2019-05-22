import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetailPage } from './detail.page';
import { ModelViewerComponent } from 'src/components';

const routes: Routes = [
  {
    path: 'pokemon/:pkmn',
    component: DetailPage,
  },
];

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RouterModule.forChild(routes)],
  declarations: [DetailPage, ModelViewerComponent],
})
export class DetailPageModule {}
