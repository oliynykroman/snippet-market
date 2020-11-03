import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private localStorage: LocalStorageService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('ccc', req);
        if (this.isValidUrlForIntercept(req.url)) {
           let Authrequest = req.clone({
                setHeaders: {
                    Authorization: `Bearer test`
                }
            });
            return next.handle(Authrequest);
        }
        req = req.clone({
            setHeaders: {
                'Content-Type': 'application/json'
            }
        });
        return next.handle(req);

    }

    private isValidUrlForIntercept(requestUrl: string): boolean {
        if (requestUrl.indexOf('githun') > -1) {
            return true;
        }
        return false
    }
}