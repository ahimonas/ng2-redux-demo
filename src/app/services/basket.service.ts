
import { Injectable, Inject } from '@angular/core';
import { Http, URLSearchParams, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class BasketService {
    constructor(private _http: Http) { }
    
    getBaskets() {
        return this._http.get("/assets/baskets.json").map(res => res.json());
    }

}