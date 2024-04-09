import { OwlOptions } from 'ngx-owl-carousel-o';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product';
import { EcommdataService } from 'src/app/shared/services/ecommdata.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{



  // ngOnInit starts instantly when opening the home page -----> like constructor but the constructor for dependancy injection only
  constructor(private _EcommdataService:EcommdataService , private _CartService:CartService,private _ToastrService:ToastrService){}

  products:Product[]=[]
  categories:any[]=[]
  searchTerm:string=" "

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

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,

    navSpeed: 900,
    navText: ['Previous', 'Next'],
    autoplay:true,
    autoplayTimeout:2000,
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


  mainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    
    navSpeed: 900,
    navText: ['', ''],
    autoplay:true,
    autoplayTimeout:2000,

    items:1,
    nav: false
  }
    
  ngOnInit(): void {
      this._EcommdataService.getAllProducts().subscribe({
        next: (response)=>{
          this.products = response.data
          
        }
      })
      this._EcommdataService.getCategories().subscribe({
        next: (response)=>{
        this.categories = response.data;
        }
      })
  }

 
}

