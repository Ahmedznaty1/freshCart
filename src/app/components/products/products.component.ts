import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcommdataService } from 'src/app/shared/services/ecommdata.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { Scroll } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private _EcommdataService:EcommdataService , private _CartService:CartService,private _ToastrService:ToastrService){}

  products:Product[]=[]
  pageSize:number = 0
  currentPage:number = 1
  total:number = 0
  




  ngOnInit(): void {
    this._EcommdataService.getAllProducts().subscribe({
      next: (response)=>{
      this.products = response.data
      this.pageSize = response.metadata.limit
      this.currentPage = response.metadata.currentPage
      this.total = response.results
      
      }
    })
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

pageChanged(event:any){
  this._EcommdataService.getAllProducts(event).subscribe({
    next: (response)=>{
    this.products = response.data
    this.pageSize = response.metadata.limit
    this.currentPage = response.metadata.currentPage
    this.total = response.results
    window.scrollTo(0,0)
    
    
    }
  })

}
}
