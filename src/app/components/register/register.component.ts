import { Router, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';


// input ===> form-control  <input>
// inputs ===> form group ..... <form></form>

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor( private _AuthService:AuthService, private _Router:Router,private _FormBuilder:FormBuilder ){}
  msgErr:string=''
  isLoading:boolean=false

  visible:boolean=true
  changetype:boolean =true;


  // registerForm:FormGroup = new FormGroup( {
  //   name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
  //   email: new FormControl('' , [Validators.required , Validators.email ]),
  //   password: new FormControl('' , [Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),
  //   rePassword: new FormControl('' , [Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),
  //   phone: new FormControl('', [Validators.required , Validators.pattern(/^01[125][0-9]{8}$/)]),

  // } );

  registerForm:FormGroup = this._FormBuilder.group({
    name:[null,[Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email: [ null,[Validators.required , Validators.email ]],
    password:[null,[Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]],
    rePassword:[null],
    phone:[null,[Validators.required ,Validators.pattern(/^01[0125][0-9]{8}$/)]]
  } , {validators:[this.confirmPassword]} as FormControlOptions)


  confirmPassword(group:FormGroup){
    const password = group.get('password')
    const rePassword = group.get('rePassword')
    
    if(rePassword?.value ==null || rePassword?.value ==' '){
      rePassword?.setErrors({required:true})
    }
    else if (password?.value != rePassword?.value){
      rePassword?.setErrors({mismatch:true})
    }
  }



  handleForm():void{

    if(this.registerForm.valid){
      this.isLoading=true
      this._AuthService.setRegister(this.registerForm.value).subscribe({
          //if the respone is good with no errors

        next: (response)=>{
          if(response.message == 'success'){
          this._Router.navigate(['/login'])
      this.isLoading=false

          

          }
          // console.log(response);
        },
        error: (err:HttpErrorResponse)=>{
          //if there is an error
          console.log(err);
          this.msgErr = err.error.message
          
          this.isLoading=false

        }
      })
    }
    
  }

  viewPass(){
    this.visible = !this.visible
    this.changetype = !this.changetype;

  }


}
