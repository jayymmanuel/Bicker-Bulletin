import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthServiceService } from './auth-service.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthServiceService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.authService.getToken();

        const authRequest = req.clone(
            {
                headers: req.headers.set('Authorization', 'Bearer ' + authToken)
            });
        return next.handle(authRequest);
    }
}