import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { StorageMap } from '@ngx-pwa/local-storage';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private storage: StorageMap) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer test`
            }
        });
        return next.handle(req);
    }
}