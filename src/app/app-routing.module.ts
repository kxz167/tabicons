import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IconDisplayComponent } from './icon-display/icon-display.component';

const routes: Routes = [
  { path: 'icon-display', component: IconDisplayComponent,
    children: [
      {path: '**', component: IconDisplayComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
