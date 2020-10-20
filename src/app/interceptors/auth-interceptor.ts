import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private localStorage: LocalStorageService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        req = req.clone({
            setHeaders: {
                Authorization: `${this.localStorage.authTokenF()}`
            }
        });

        return next.handle(req);
    }
}