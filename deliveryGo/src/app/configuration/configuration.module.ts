import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationRoutingModule } from './configuration-routing.module';
import { IndexComponent } from './components/index/index.component';
import { MaterialModule } from '../shared/module/material.module';
import { EditComponent } from './components/edit/edit.component';


@NgModule({
  declarations: [
    IndexComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    MaterialModule
  ]
})
export class ConfigurationModule { }
