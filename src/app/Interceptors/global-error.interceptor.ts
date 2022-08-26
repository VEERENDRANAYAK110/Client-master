import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class GlobalErrorInterceptor implements HttpInterceptor {
  
  constructor(private router:Router, private toastr:ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> 
  {
    return next.handle(request).pipe(
      catchError(error =>
        {
          if(error)
          {
            switch(error.status)
            {
              case 400:
                if(error.error.errors)
                {
                  const modalStateErrors =[];
                  for(const key in error.error.errors)
                  {
                    if(error.error.errors[key])
                    {
                      modalStateErrors.push(error.error.errors[key])
                    }
                  }
                  throw modalStateErrors.flat();
                }
                else{
                  this.toastr.error(error.error,
                    'Registration Failed!!' , {
                      enableHtml: true,
                      closeButton: true,
                      timeOut: 2000
                  })
                }
              break;


              case 401:
                  this.toastr.error(error.error,
                    'Login Failed!!' , {
                      enableHtml: true,
                      closeButton: true,
                      timeOut: 2000
                  })
              break;

              case 0:
                  this.toastr.error('Some Error occurred at server connection!!',
                    'Connection Failed!!' , {
                      enableHtml: true,
                      closeButton: true,
                      timeOut: 6000
                  })
              break;

              case 404:
                  this.router.navigateByUrl('/not-found');
              break;

              case 500:
                  const navigatopnExtras:NavigationExtras={state:{error:error.error}};
                  this.router.navigateByUrl('/server-error',navigatopnExtras);
              break;

              default:
                this.toastr.error(error.error,
                  'Some Error Occured!!' , {
                    enableHtml: true,
                    closeButton: true,
                    timeOut: 2000
                })
                console.log(error);
              break;
            }
          }
          return throwError(error);
        })
    )
  }
}
