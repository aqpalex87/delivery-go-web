import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
export interface Ventas {
  nroPedido: number;
  cliente: string;
  moneda: string;
  importePedido: number;
  descuentoAplicado: number;
  importePuntos: number;
  marca: string;
  fechaTransaccion: Date;
  fechaLiquidacion: Date;
  estado: string;
}

const data: Ventas[] = [
  { nroPedido: 4566387402, cliente: 'Mariangela Pacheco', moneda: 'PEN', importePedido: 101.60, descuentoAplicado: 101.60, importePuntos: 0.00, marca: 'Visa', fechaTransaccion: new Date(), fechaLiquidacion: new Date(), estado: 'Liquidado' },
  { nroPedido: 4566387402, cliente: 'Erick Arrasco Guevara', moneda: 'PEN', importePedido: 101.60, descuentoAplicado: 101.60, importePuntos: 0.00, marca: 'Visa', fechaTransaccion: new Date(), fechaLiquidacion: new Date(), estado: 'Liquidado' },
  { nroPedido: 4566387402, cliente: 'Daniel Torres Claros', moneda: 'PEN', importePedido: 101.60, descuentoAplicado: 101.60, importePuntos: 0.00, marca: 'Visa', fechaTransaccion: new Date(), fechaLiquidacion: new Date(), estado: 'Liquidado' },
  { nroPedido: 4566387402, cliente: 'Juan Leyva Penny', moneda: 'PEN', importePedido: 101.60, descuentoAplicado: 101.60, importePuntos: 0.00, marca: 'Visa', fechaTransaccion: new Date(), fechaLiquidacion: new Date(), estado: 'Denegado' },
  { nroPedido: 4566387402, cliente: 'Mauricio Martin Martin', moneda: 'PEN', importePedido: 101.60, descuentoAplicado: 101.60, importePuntos: 0.00, marca: 'Visa', fechaTransaccion: new Date(), fechaLiquidacion: new Date(), estado: 'Denegado' },
  { nroPedido: 4566387402, cliente: 'Raul Cahuapoma', moneda: 'PEN', importePedido: 101.60, descuentoAplicado: 101.60, importePuntos: 0.00, marca: 'Visa', fechaTransaccion: new Date(), fechaLiquidacion: new Date(), estado: 'Denegado' },
  { nroPedido: 4566387402, cliente: 'Maria Torres Chilca', moneda: 'PEN', importePedido: 101.60, descuentoAplicado: 101.60, importePuntos: 0.00, marca: 'Visa', fechaTransaccion: new Date(), fechaLiquidacion: new Date(), estado: 'Liquidado' },
  { nroPedido: 4566387402, cliente: 'Estela Lopez Doria', moneda: 'PEN', importePedido: 101.60, descuentoAplicado: 101.60, importePuntos: 0.00, marca: 'Visa', fechaTransaccion: new Date(), fechaLiquidacion: new Date(), estado: 'Liquidado' },
  { nroPedido: 4566387402, cliente: 'Carla Ochoa Torres', moneda: 'PEN', importePedido: 101.60, descuentoAplicado: 101.60, importePuntos: 0.00, marca: 'Visa', fechaTransaccion: new Date(), fechaLiquidacion: new Date(), estado: 'Liquidado' },
  { nroPedido: 4566387402, cliente: 'Julio Loo Perez', moneda: 'PEN', importePedido: 101.60, descuentoAplicado: 101.60, importePuntos: 0.00, marca: 'Visa', fechaTransaccion: new Date(), fechaLiquidacion: new Date(), estado: 'Liquidado' },
  { nroPedido: 4566387402, cliente: 'Mariangela Pacheco', moneda: 'PEN', importePedido: 101.60, descuentoAplicado: 101.60, importePuntos: 0.00, marca: 'Visa', fechaTransaccion: new Date(), fechaLiquidacion: new Date(), estado: 'Liquidado' },
  { nroPedido: 4566387402, cliente: 'Erick Arrasco Guevara', moneda: 'PEN', importePedido: 101.60, descuentoAplicado: 101.60, importePuntos: 0.00, marca: 'Visa', fechaTransaccion: new Date(), fechaLiquidacion: new Date(), estado: 'Liquidado' },
  { nroPedido: 4566387402, cliente: 'Daniel Torres Claros', moneda: 'PEN', importePedido: 101.60, descuentoAplicado: 101.60, importePuntos: 0.00, marca: 'Visa', fechaTransaccion: new Date(), fechaLiquidacion: new Date(), estado: 'Liquidado' },
  { nroPedido: 4566387402, cliente: 'Juan Leyva Penny', moneda: 'PEN', importePedido: 101.60, descuentoAplicado: 101.60, importePuntos: 0.00, marca: 'Visa', fechaTransaccion: new Date(), fechaLiquidacion: new Date(), estado: 'Liquidado' },
  { nroPedido: 4566387402, cliente: 'Mauricio Martin Martin', moneda: 'PEN', importePedido: 101.60, descuentoAplicado: 101.60, importePuntos: 0.00, marca: 'Visa', fechaTransaccion: new Date(), fechaLiquidacion: new Date(), estado: 'Liquidado' },
  { nroPedido: 4566387402, cliente: 'Raul Cahuapoma', moneda: 'PEN', importePedido: 101.60, descuentoAplicado: 101.60, importePuntos: 0.00, marca: 'Visa', fechaTransaccion: new Date(), fechaLiquidacion: new Date(), estado: 'Liquidado' },
]

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements AfterViewInit {

  displayedColumns: string[] = ['select', 'nroPedido', 'cliente', 'moneda', 'importePedido', 'descuentoAplicado', 'importePuntos', 'marca', 'fechaTransaccion', 'fechaLiquidacion', 'estado', 'acciones'];
  dataSource = new MatTableDataSource(data);
  selection = new SelectionModel<Ventas>(true, []);
  resultsLength = 16;

  constructor(private _liveAnnouncer: LiveAnnouncer, private router: Router) { }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = 'Elementos por página';
    this.paginator._intl.nextPageLabel = 'Página Siguiente';
    this.paginator._intl.previousPageLabel = 'Página Anterior';
    this.paginator._intl.firstPageLabel = 'Primera Página';
    this.paginator._intl.lastPageLabel = 'Última página';
    this.paginator.page.subscribe(() => { });
    this.sort.sortChange.subscribe(() => { });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: Ventas): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.nroPedido + 1}`;
  }

  viewDetail(row: any) {
    this.router.navigate([
      '/sales/detail',
      row.nroPedido,
    ]);
  }

  export(){
    this.convertDataToExcel(data);
  }

  convertDataToExcel(dataExport: Ventas[]){
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataExport);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'movimientos');
    XLSX.writeFile(workbook, 'export_file.xlsx');
  }
}
