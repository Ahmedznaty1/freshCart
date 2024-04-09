import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
// import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder, FormControl, FormControlOptions, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ForgetpasswordService } from 'src/app/shared/services/forgetpassword.service';



@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent {
  constructor(private _ForgetpasswordService:ForgetpasswordService , private _Router:Router,private _ToastrService:ToastrService){}

    step1:boolean = true
    step2:boolean = false
    step3:boolean = false
    email:string = ''
    usermsgErr:string=''
    visible:boolean=true
  changetype:boolean =true;


    forgetForm:FormGroup = new FormGroup({
      email:new FormControl('')
    })
    resetcodeForm:FormGroup = new FormGroup({
      resetCode:new FormControl('')
    })
    resetPassword:FormGroup = new FormGroup({
      newPassword:new FormControl ('',[Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)])
    })

    forgetPassword(){
      let userEmail = this.forgetForm.value
      this.email= userEmail.email
      this._ForgetpasswordService.forgetPssword(userEmail).subscribe({
        next: (response)=>{
          if(response.statusMsg='success'){
            this.usermsgErr = ''
          }
          this.step1 = false
          this.step2 = true
          this._ToastrService.success(response.message)
            
        },
        error:(err) =>{
          this.usermsgErr = err.error.message
        }
      })
    }
    resetCode(){
      let resetCode = this.resetcodeForm.value
      this._ForgetpasswordService.resetCode(resetCode).subscribe({
        next: (response) =>{
        if(response.message='Success'){
          this.usermsgErr = ''
        }
          this.step2 = false
          this.step3 = true
          this._ToastrService.info('Enter New Password')
          // console.log(response);
          
        },
        error: (err)=>{
          this.usermsgErr = err.error.message
          // console.log(err);
        }
      })
    }


    newPassword(){
      if(this.resetPassword.valid){
        let resetForm = this.resetPassword.value
        resetForm.email = this.email
        this._ForgetpasswordService.resetPassword(resetForm).subscribe({
          next:(response)=>{
            console.log(response);
            if(response.token){
              localStorage.setItem('eToken',response.token)
            this._ToastrService.success('Password Updated')
              this._Router.navigate(['/home'])
            }
  
            
          },
          error: (err:HttpErrorResponse)=>{
            console.log(err);
            this.usermsgErr = err.error.message
  
            
          }
        })
      }
      
    }

    viewPass(){
      this.visible = !this.visible
      this.changetype = !this.changetype;
  
    }
}
