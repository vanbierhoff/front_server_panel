import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestService } from '../core/rest-service';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class TestService extends RestService {
    constructor(override http: HttpClient) {
        super(http, 'api');
    }
    
    override get<R, T>(): Observable<R> {
        return super.get({});
    }
}
