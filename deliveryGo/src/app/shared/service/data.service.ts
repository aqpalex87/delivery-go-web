import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from '@auth0/angular-jwt';
const helper = new JwtHelperService();

@Injectable({ providedIn: 'root' })
export class DataService {

    constructor(private http: HttpClient) { }

    getData(filters: any) {
        //return this.http.get(environment.apiURL + this.controller + '/GetDataofSales',{ params: filtros });
        let _dataJson = 'assets/json/data.json';
        return this.http.get(_dataJson);
    }

    getCommerces(id: number) {
        let _commercesJson = 'assets/json/commerces.json';
        return this.http.get(_commercesJson);
    }

    getDni() {
        let jwt = JSON.parse(sessionStorage.getItem('jwt'));
        let decode_jwt = helper.decodeToken(jwt.token);
        return decode_jwt.dni;
    }
}