import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesRoutingModule } from './sales-routing.module';
import { IndexComponent } from './components/index/index.component';
import { MaterialModule } from '../shared/module/material.module';
import { DetailComponent } from './components/detail/detail.component';
import { AngularPaginatorModule } from 'angular-paginator';

@NgModule({
  declarations: [
    IndexComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    MaterialModule,
    AngularPaginatorModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SalesModule { }
