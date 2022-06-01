import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  opened = true;
  panelOpenState = false;

  idCommerce = sessionStorage.getItem('idCommerce');

  constructor(private authSvc: AuthenticationService) { }

  ngOnInit(): void {}

  logout() {
    this.authSvc.logout();
  }

}
