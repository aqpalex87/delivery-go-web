import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { User } from "../interface/user";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    constructor(private http: HttpClient, private router: Router) { }

    controller: string = '/Authentication';

    login(user: User) {
        //return this.http.post(environment.apiURL + this.controller + '/login', user);
        let _dataJson = 'assets/json/login.json'
        return this.http.get(_dataJson);
    }

    logout() {
        this.router.navigate(['/']);
    }
}