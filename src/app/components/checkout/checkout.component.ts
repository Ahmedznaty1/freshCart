import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  msgErr:string=''

  constructor(private _FormBuilder:FormBuilder , private _ActivatedRoute:ActivatedRoute, private _CartService:CartService){}

  
  checkOut:FormGroup = this._FormBuilder.group({
    details:[''],
    phone:['',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
    city:['',Validators.required]
  })


  cartId:any = ""
  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:(params)=>{
            this.cartId = params.get('id')          
        }
      })
  }

  handleForm(){
  if(this.checkOut.valid){
    console.log(this.checkOut.value);
    this._CartService.checkOut(this.cartId,this.checkOut.value).subscribe({
      next: (response)=>{
        if(response.status =='success'){
          window.open(response.session.url , '_self')
        }
        
      }
    })
  }
    
  }
}

