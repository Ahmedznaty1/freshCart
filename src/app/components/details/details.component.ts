import { OwlOptions } from 'ngx-owl-carousel-o';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/product';
import { EcommdataService } from 'src/app/shared/services/ecommdata.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
// ActivatedRoute informations about the current routing page
  constructor(private _ActivatedRoute:ActivatedRoute, private _EcommdataService:EcommdataService,private _CartService:CartService,private _ToastrService:ToastrService){}

productDetails:Product = {} as Product;
productSlider: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: true,

  navSpeed: 900,
  navText: ['Previous', 'Next'],
  autoplay:true,
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 6
    }
  },
  nav: false
}


adding(id:string){
  this._CartService.addToCart(id).subscribe({
    next: (response)=>{
      console.log(response);

      this._ToastrService.success(response.message,'Fresh Cart')
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}

ngOnInit(): void {



this._ActivatedRoute.paramMap.subscribe({
  next: (params)=>{
    let idProduct:any= params.get('id')
    // console.log(idProduct);
    this._EcommdataService.getSpecificProduct(idProduct).subscribe({
      next:(response)=>{
        this.productDetails = response.data
      }
    })

    
  }
})
}
}


