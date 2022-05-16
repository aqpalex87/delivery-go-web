import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

export interface Historial {
  estado: string;
  fechaEvento: Date;
  cliente: string;
  montoTransaccion: number
}

const data: Historial[] = [
  { estado: 'Liquidado', fechaEvento: new Date(), cliente: 'Mariangela Pacheco', montoTransaccion: 101.60 },
  { estado: 'Autorizado', fechaEvento: new Date(), cliente: 'Mariangela Pacheco', montoTransaccion: 101.60 }
]
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['estado', 'fechaEnvio', 'cliente', 'montoTransaccion'];
  dataSource = new MatTableDataSource<Historial>(data);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  currentPage = 1;
  itemsPerPage = 10;

  idCommerce: number;
  nroPedido: number;

  constructor(private _liveAnnouncer: LiveAnnouncer, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parameters: any) => {
      this.idCommerce = parameters.idCommerce;
      this.nroPedido = parameters.nroPedido;
    });
  }

  back() {
    this.router.navigate(['sales/index', this.idCommerce]);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
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


  cambioPagina(paginator: any) {
  }

  nextPage() {
    this.paginator.nextPage();
  }

  previousPage() {
    this.paginator.previousPage();
  }

}
