import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/shared/service/data.service';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, AfterViewInit {
  @ViewChild('table') myTable: MatTable<any>;
  form: FormGroup;

  displayedColumns: string[] = [];
  data: any[] = [];
  resultsLength = 0;
  currentPage: number;
  itemsPerPage: number;
  sizes: any[] = ['10', '15', '25', '50', '100'];

  idCommerce: number;
  nroPedido: number;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private _formBuilder: FormBuilder, private dataSvc: DataService) {
    this.form = this._formBuilder.group({
      nroPedido: [''],
      page: [''],
      sort: [''],
      order: [''],
      length: [''],
      estado: [''],
      fechaEvento: [''],
      cliente: [''],
      montoTransaccion: ['']
    });
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parameters: any) => {
      this.idCommerce = parameters.idCommerce;
      this.nroPedido = parameters.nroPedido;
    });

    this.sort.active = 'fechaEvento';
    this.form.controls.page.setValue(1, { emitEvent: false });
    this.paginator.pageSize = 10;
    this.itemsPerPage = 10;
    this.form.controls.length.setValue('10', { emitEvent: false });
    this.form.controls.length.valueChanges.subscribe((value) => {
      this.itemsPerPage = value;
      this.paginator.pageSize = value;
      this.form.controls.length.setValue(value.toString(), { emitEvent: false });
      this.cargarListado(false);
    }
    );
    this.currentPage = 1;
    this.cargarListado(true);
  }

  back() {
    this.router.navigate(['sales/index', this.idCommerce]);
  }

  ngAfterViewInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'items por página';
    this.paginator._intl.nextPageLabel = 'Página Siguiente';
    this.paginator._intl.previousPageLabel = 'Página Anterior';
    this.paginator._intl.firstPageLabel = 'Primera Página';
    this.paginator._intl.lastPageLabel = 'Última página';
    this.paginator.page.subscribe(() => this.cargarListado(false));
    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
      this.cargarListado(false);
    });
  }

  cargarListado(reset: boolean) {
    this.resultsLength = 0;
    this.displayedColumns = [];
    this.data = [];
    if (reset) {
      this.paginator.pageIndex = 0;
    }
    this.form.controls.nroPedido.setValue(this.nroPedido);
    this.form.controls.sort.setValue(this.sort.active);
    this.form.controls.order.setValue(this.sort.direction);
    this.dataSvc.getDataOrder(this.form.value).subscribe((response: any) => {
      this.displayedColumns = [
        'estado',
        'fechaEvento',
        'cliente',
        'montoTransaccion']
      this.data = response['data'];
      this.resultsLength = response['total'];
    });
  }

  cambioPagina(pagination: any) {
    this.form.controls.page.setValue(pagination.currentPage);
    this.currentPage = pagination.currentPage;
    this.cargarListado(false);
  }

  nextPage(pagination: any) {
    this.form.controls.page.setValue(pagination.currentPage);
    this.currentPage = pagination.currentPage;
    this.cargarListado(false);
  }

  previousPage(pagination: any) {
    this.form.controls.page.setValue(pagination.currentPage);
    this.currentPage = pagination.currentPage;
    this.cargarListado(false);
  }

}
