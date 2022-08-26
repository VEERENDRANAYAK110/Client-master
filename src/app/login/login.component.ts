import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../Services/account.service';
import { ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model:any={};
  loginForm:FormGroup;
  LoginFailed:boolean=false;
  @ViewChild('modal') modalClose: any;
  
  constructor(public accountServices:AccountService, private router:Router,
    private toastr:ToastrService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['',[Validators.required, Validators.minLength(8)]],
      password:['',Validators.compose([Validators.required,Validators.minLength(8)])]
    })
  }

  login()
  {
    this.accountServices.login(this.model).subscribe(
      {
      next:response=>
        {
          this.model.userName='';
          this.model.password='';
          this.LoginFailed=false;
          this.modalClose.nativeElement.click();
          this.toastr.success("Login Success!!",
              'Congratulations!!!!' , {
                enableHtml: true,
                closeButton: true,
                timeOut: 2000
            })
          this.router.navigateByUrl('/members');
        },
        error: error=>{
          this.modalClose.nativeElement.click();
          this.LoginFailed=true;
        }

      })
      
  }
  Closeclick()
  {
    this.model.userName='';
    this.model.password='';
    this.LoginFailed=false;
    this.modalClose.nativeElement.click();
  }

  logout()
  {
    this.model.userName='';
    this.model.password='';
    this.LoginFailed=false;
    this.toastr.success("Logged Out!!",
              'Good Bye!!!!' , {
                enableHtml: true,
                closeButton: true,
                timeOut: 2000
            })
    this.accountServices.logout();
    this,this.router.navigateByUrl('/');
    
  }

}
