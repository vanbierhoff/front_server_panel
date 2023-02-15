import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SerializerService } from '../../../shared/serialize/serialize.service';
import { ParamsRequestInterface, RequestInterface } from './models';


export abstract class RestService {
    protected get endpoint(): string {
        return this._endpoint;
    }

    protected set endpoint(value: string) {
        this._endpoint = value;
    }

    protected constructor(protected http: HttpClient, private _endpoint: string) {
    }

    static isRequestDataInterface<T extends object>(args: RequestInterface<T>): args is ParamsRequestInterface {
        return !(!('url' in args) && !('data' in args) && !('options' in args));
    }

    post<R, T>(args: RequestInterface<T>): Observable<R> {
        if (!(RestService.isRequestDataInterface(args))) {
            return this.http.post<R>(this.endpoint,
                SerializerService.serialize(args));
        }
        const res: ParamsRequestInterface = {
            url: args.url ? `${this.endpoint}/${args.url}` : this.endpoint,
            data: args.data ?
                args.data : SerializerService.serialize(args)
        };
        return this.http.post<R>(res?.url || `${this.endpoint}`,
            res?.data);
    }

    put<R, T>(args: RequestInterface<T>): Observable<R> {
        if (!(RestService.isRequestDataInterface(args))) {
            return this.http.put<R>(this.endpoint,
                SerializerService.serialize(args));
        }
        const res: ParamsRequestInterface = {
            url: args.url ? `${this.endpoint}/${args.url}` : this.endpoint,
            data: args.data ? SerializerService.serialize(args.data)
                :
                SerializerService.serialize(args)
        };
        return this.http.put<R>(res?.url || `${this.endpoint}`,
            res?.data);
    }

    get<R, T>(args: RequestInterface<T>): Observable<R> {
        if (!(RestService.isRequestDataInterface(args))) {
            return this.http.get<R>(this.endpoint);
        }
        const url: string = args?.url ? `${this.endpoint}${args.url}` : this.endpoint;
        const params = args?.options ?
            new HttpParams({fromObject: args.options}) : {};

        return this.http.get<R>(url, {params});
    }

}

