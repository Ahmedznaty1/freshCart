import { Router, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private _AuthService:AuthService , private _Router:Router, private _FormBuilder:FormBuilder){}
  msgErr:string=''
  visible:boolean=true
  changetype:boolean =true;

  isLoading:boolean=false



  // loginForm:FormGroup = new FormGroup ({
  //   email: new FormControl ('',[Validators.required, Validators.email]),
  //   password: new FormControl ('',[Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)])
  // })

  loginForm:FormGroup = this._FormBuilder.group({
    email:[null,[Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]]
  })

  handleForm():void{
    if(this.loginForm.valid){
      this.isLoading=true

        this._AuthService.setLogin(this.loginForm.value).subscribe({
          next: (respose)=>{
            if(respose.message == 'success'){
              localStorage.setItem("eToken" , respose.token)
              this._AuthService.saveUserData();
              
              this._Router.navigate(['/home'])

            }
            
          },
          error: (err:HttpErrorResponse)=>{
            console.log(err);
          this.msgErr = err.error.message
          this.isLoading=false
            
          }
        })
    }
    else{
      this.loginForm.markAllAsTouched()
    }
  }



  viewPass(){
    this.visible = !this.visible
    this.changetype = !this.changetype;

  }
}
