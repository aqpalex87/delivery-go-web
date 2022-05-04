import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { TemplateComponent } from '../shared/component/template/template.component';

const routes: Routes = [
  {
    path: '',
    component: TemplateComponent,
    children: [
      {
        path: 'v-casa',
        component: IndexComponent,
      },
      {
        path: '**',
        redirectTo: 'home/v-casa',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
