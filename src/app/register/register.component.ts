import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../Services/account.service';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../Validator/custom-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model:any={};
  @ViewChild('modal') modalClose: any;

  RegistrationFailed:boolean=false;
  constructor(private accountService:AccountService, private toastr:ToastrService
    ,private router:Router,private formBuilder: FormBuilder) { }
  registerForm: FormGroup;
  // registrationForm= new FormGroup({
  //   userName:new FormControl('',[Validators.required]),
  //   password: new FormControl('',[Validators.required])
  // });

  ngOnInit(): void {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    this.registerForm = this.formBuilder.group({
      userName: ['',[Validators.required, Validators.minLength(8)]],
      password:['',Validators.compose([
        Validators.required,
        Validators.minLength(8),
         // 2. check whether the entered password has a number
         CustomValidators.patternValidator(/\d/, { hasNumber: true }),
         // 3. check whether the entered password has upper case letter
         CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
         // 4. check whether the entered password has a lower-case letter
         CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
         // 5. check whether the entered password has a special character
         CustomValidators.patternValidator(specialChars,{hasSpecialCharacters: true})
      ])]
    })   
  }

  register()
  {
    this.accountService.register(this.model).subscribe(
        {
          next:response=>{
            this.RegistrationFailed=false;
            this.modalClose.nativeElement.click();
            this.router.navigateByUrl('/members');
            this.toastr.success("Registration Successful!!",
              'Congratulations!!!!' , {
                enableHtml: true,
                closeButton: true,
                timeOut: 2000
            })
            this.cancel();
          },
          error: error=>{
            console.log(error);
            this.RegistrationFailed=true;
          }
      })
  }
  cancel()
  {
    this.model.username='';
    this.model.password='';
    this.RegistrationFailed=false;
  }
}
