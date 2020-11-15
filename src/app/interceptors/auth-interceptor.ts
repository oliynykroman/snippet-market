import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { LocalStorageService } from '../services/local-storage.service';
import { environment } from 'src/environments/environment';

const api = environment;

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private localStorage: LocalStorageService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.isValidUrlForIntercept(req.url)) {
            let gitDataRequest = req.clone({
                setHeaders: {
                    'Content-Type': 'application/json'
                }
            });
            return next.handle(gitDataRequest); 
        }
        else {
            if (typeof this.localStorage.getTokenData() !== "undefined") {
                let authRequest = req.clone({
                    url: api.userDataDomain + req.url,
                    setHeaders: {
                        Authorization: `Bearer Authtoken`
                    }
                });
                return next.handle(authRequest);
            } 
            let dataRequest = req.clone({
                url: api.apiAuthDomain + req.url,
                setHeaders: {
                    'Content-Type': 'application/json'
                }
            });
            return next.handle(dataRequest);
        }


    }

    private isValidUrlForIntercept(requestUrl: string): boolean {
        console.log('change interceptor for github');
        if (requestUrl.indexOf('github') > -1) {
            console.log('github');
            return true;
        }
        console.log('my server');
        return false;
    }
}