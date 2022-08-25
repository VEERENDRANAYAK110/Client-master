import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../Services/account.service';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model:any={};

  @ViewChild('modal') modalClose: any;
  
  constructor(public accountServices:AccountService, private router:Router,
    private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  login()
  {
    this.accountServices.login(this.model).subscribe(

      ()=>
        {
          this.modalClose.nativeElement.click();
          this.router.navigateByUrl('/members');
        })
  }
  Closeclick()
  {
    this.modalClose.nativeElement.click();
  }

  logout()
  {
    this.accountServices.logout();
    this,this.router.navigateByUrl('/');
  }

}
