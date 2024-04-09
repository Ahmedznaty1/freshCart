import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  constructor(private _CartService:CartService){}

 
  cartDetails:any = {}
  ngOnInit(): void{
    this._CartService.getUserCart().subscribe({
      next: (response)=>{
        console.log(response.data);
        
        this.cartDetails = response.data
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  remove(id:string){
    this._CartService.removeItem(id).subscribe({
      next:(response)=>{
        this.cartDetails = response.data
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  update(id:string,count:number){
    if(count>0){
      this._CartService.updateCart(id,count).subscribe({
        next: (response)=>{
          this.cartDetails = response.data
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
  }


}
