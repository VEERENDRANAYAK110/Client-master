import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../Models/user';
import { AccountService } from '../Services/account.service';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

   model:any={};
  constructor(public accountServices:AccountService, private router:Router,
    private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  login()
  {
    this.accountServices.login(this.model).subscribe(

      ()=>
        {
          this.router.navigateByUrl('/members');
        })
  }

  logout()
  {
    this.toastr.error("Good Bye!!",
              'Logged Out!!!!' , {
                enableHtml: true,
                closeButton: true,
                timeOut: 3000
            })
    this.accountServices.logout();
    this,this.router.navigateByUrl('/');
  }

}
