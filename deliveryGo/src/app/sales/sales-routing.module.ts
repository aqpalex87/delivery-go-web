import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from '../shared/component/template/template.component';
import { DetailComponent } from './components/detail/detail.component';
import { IndexComponent } from './components/index/index.component';

const routes: Routes = [
  {
    path: '',
    component: TemplateComponent,
    children: [
      {
        path: 'v-home',
        component: IndexComponent,
      },
      {
        path: 'detail/:nroPedido',
        component: DetailComponent,
      },
      {
        path: '**',
        redirectTo: 'v-home',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
