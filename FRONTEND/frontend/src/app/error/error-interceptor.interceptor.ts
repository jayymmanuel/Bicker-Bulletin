import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorComponent } from './error/error.component';

@Injectable()
export class ErrorInterceptorInterceptor implements HttpInterceptor {

  constructor(private dialog: MatDialog) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = "An Unknown Error has occurred";
        if (error.error.message) {
          errorMessage = error.error.message;
        }
        
        // Open the ErrorComponent to display the error message.
        this.dialog.open(ErrorComponent, { data: { message: errorMessage } });

        return throwError(error);
      })
    );
  }
}
