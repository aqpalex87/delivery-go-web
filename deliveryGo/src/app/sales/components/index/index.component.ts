import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/shared/service/data.service';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})

export class IndexComponent implements OnInit, AfterViewInit {
  @ViewChild('table') myTable: MatTable<any>;

  displayedColumns: string[] = [];
  data: any[] = [];
  resultsLength = 0;

  sizes: any[] = ['10', '15', '25', '50', '100'];

  selection = new SelectionModel<any>(true, []);

  formFilterDate: FormGroup;
  formFilter: FormGroup;

  currentPage: number;
  itemsPerPage: number;

  idCommerce: number;

  constructor(private router: Router, private _formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private dataSvc: DataService) {
    this.formFilterDate = this._formBuilder.group({
      hoy: [true],
      estaSemana: [false],
      esteMes: [false],
      desde: [new Date().toISOString()],
      hasta: [new Date().toISOString()]
    });

    this.formFilter = this._formBuilder.group({
      idCommerce: [''],
      page: [''],
      sort: [''],
      order: [''],
      length: [''],
      nroPedido: [''],
      cliente: [''],
      moneda: [''],
      importePedido: [''],
      marca: [''],
      fechaTransaccion: [''],
      fechaLiquidacion: [''],
      estado: ['']
    });
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parameters: any) => {
      this.idCommerce = parameters.idCommerce;
    });

    this.sort.active = 'nroPedido';
    this.formFilter.controls.page.setValue(1, { emitEvent: false });
    this.paginator.pageSize = 10;
    this.itemsPerPage = 10;
    this.formFilter.controls.length.setValue('10', { emitEvent: false });
    this.formFilter.controls.length.valueChanges.subscribe((value) => {
      this.itemsPerPage = value;
      this.paginator.pageSize = value;
      this.formFilter.controls.length.setValue(value.toString(), { emitEvent: false });
      this.cargarListado(false);
    }
    );
    this.currentPage = 1;
    this.cargarListado(true);
  }

  cargarListado(reset: boolean) {
    //console.log(this.formFilter.value);
    this.resultsLength = 0;
    this.displayedColumns = [];
    this.data = [];
    if (reset) {
      this.paginator.pageIndex = 0;
    }
    this.formFilter.controls.idCommerce.setValue(this.idCommerce);
    this.formFilter.controls.sort.setValue(this.sort.active);
    this.formFilter.controls.order.setValue(this.sort.direction);
    this.dataSvc.getData(this.formFilter.value).subscribe((response: any) => {
      this.displayedColumns = [
        'select',
        'nroPedido',
        'cliente',
        'moneda',
        'importePedido',
        'descuentoAplicado',
        'importePuntos',
        'marca',
        'fechaTransaccion',
        'fechaLiquidacion',
        'estado',
        'acciones'];
      this.data = response['data'];
      this.resultsLength = response['total'];
    });
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

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.resultsLength;
    return numSelected === numRows;
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.nroPedido + 1}`;
  }

  viewDetail(row: any) {
    this.router.navigate([
      '/sales/detail',
      this.idCommerce, row.nroPedido
    ]);
  }

  activeButtonFilter(description: string) {
    switch (description) {
      case 'day': {
        this.formFilterDate.controls.hoy.setValue(true);
        this.formFilterDate.controls.estaSemana.setValue(false);
        this.formFilterDate.controls.esteMes.setValue(false);
        break;
      }
      case 'week': {
        this.formFilterDate.controls.hoy.setValue(false);
        this.formFilterDate.controls.estaSemana.setValue(true);
        this.formFilterDate.controls.esteMes.setValue(false);
        break;
      }
      case 'month': {
        this.formFilterDate.controls.hoy.setValue(false);
        this.formFilterDate.controls.estaSemana.setValue(false);
        this.formFilterDate.controls.esteMes.setValue(true);
      }
    }
  }

  searchByDateFilter() {
    //console.log(this.formFilterDate.value);
  }

  searchByFilters() {
    //console.log(this.formFilter.value);
  }

  export() {
    //this.convertDataToExcel(data);
  }

  convertDataToExcel(dataExport: any[]) {
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataExport);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'movimientos');
    XLSX.writeFile(workbook, 'export_file.xlsx');
  }

  cambioPagina(pagination: any) {
    this.formFilter.controls.page.setValue(pagination.currentPage);
    this.currentPage = pagination.currentPage;
    this.cargarListado(false);
  }

  nextPage(pagination: any) {
    this.formFilter.controls.page.setValue(pagination.currentPage);
    this.currentPage = pagination.currentPage;
    this.cargarListado(false);
  }

  previousPage(pagination: any) {
    this.formFilter.controls.page.setValue(pagination.currentPage);
    this.currentPage = pagination.currentPage;
    this.cargarListado(false);
  }
}
