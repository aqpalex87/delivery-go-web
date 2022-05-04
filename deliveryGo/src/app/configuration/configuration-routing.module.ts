import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from '../shared/component/template/template.component';
import { EditComponent } from './components/edit/edit.component';
import { IndexComponent } from './components/index/index.component';

const routes: Routes = [
  {
    path: '',
    component: TemplateComponent,
    children: [
      {
        path: 'v-config',
        component: IndexComponent,
      },
      {
        path: 'edit-config',
        component: EditComponent
      },
      {
        path: '**',
        redirectTo: 'v-config',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
