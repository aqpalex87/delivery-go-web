import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseData } from 'src/app/shared/interface/response';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  id: number = this.dataSvc.getDni();
  listCommerces: any[] = [];

  constructor(private router: Router
    , private dataSvc: DataService) { }

  ngOnInit() {
    this.dataSvc.getCommerces(this.id).subscribe((response: ResponseData) => {
      if (response.success) {
        this.listCommerces = response.data;
      }
    });
  }

  createCommerce() {
    //crear comercio
  }

  getIntoCommerce(idCommerce:number) {
    //ingresar al comercio
    this.router.navigate(['sales/index',idCommerce]);
  }
}
