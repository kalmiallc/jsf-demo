import { NgModule }                                from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { BuilderComponent }                        from './jsf/builder/builder.component';
import { PlaygroundComponent }                     from './jsf/playground/playground.component';


const routes: Routes = [
  {
    path     : 'builder',
    component: BuilderComponent,
  },
  {
    path     : 'playground',
    component: PlaygroundComponent,
  },
  { path: '**', component: PlaygroundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy       : PreloadAllModules,
    onSameUrlNavigation      : 'reload',
    urlUpdateStrategy        : 'eager',
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
