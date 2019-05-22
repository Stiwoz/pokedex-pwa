import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: '../pages/home/home.module#HomePageModule' },
  { path: 'home/dex/:pkdx', loadChildren: '../pages/dex/dex.module#DexPageModule' },
  { path: 'home/dex/:pkdx/pokemon/:pkmn', loadChildren: '../pages/detail/detail.module#DetailPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
