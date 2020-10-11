import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoverLetterComponent } from './cover-letter/cover-letter.component';

const routes: Routes = [
  {
    path: '', component: CoverLetterComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
