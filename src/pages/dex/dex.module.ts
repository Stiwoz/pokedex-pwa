import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DexPage } from './dex.page';
import { ApiService } from 'src/services/api.service';

const routes: Routes = [
  {
    path: 'dex/:pkdx',
    component: DexPage,
  },
];

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RouterModule.forChild(routes)],
  declarations: [DexPage],
  providers: [ApiService],
})
export class DexPageModule {}
