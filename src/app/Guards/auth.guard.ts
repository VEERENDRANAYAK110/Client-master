import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { AccountService } from '../Services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private accountService:AccountService, private toastr:ToastrService,private router:Router){}

  canActivate(): Observable<boolean> {
    return this.accountService.currentUser$.pipe(
      map(user=>{
          if(user) return true;
          else {
          this.toastr.error('Kindly Login..',
          'Access Denied!!' , {
            enableHtml: true,
            closeButton: true,
            timeOut: 2000
        });
        this.router.navigateByUrl('/');
          return false;
          }
        })
    )
  }
  
}
