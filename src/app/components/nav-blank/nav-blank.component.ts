import { Component, ElementRef, HostListener, Renderer2, ViewChild,  } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-nav-blank',
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.css']
})
export class NavBlankComponent {


  menuValue:boolean = false





  constructor(private _AuthService:AuthService,private _Renderer2:Renderer2){}


@ViewChild('navBar') navElement!:ElementRef


@HostListener('window:scroll')
onScroll(){
  if(scrollY > 300){
    this._Renderer2.addClass(this.navElement.nativeElement , 'px-5')
    this._Renderer2.addClass(this.navElement.nativeElement , 'shadow')
  }else{
    this._Renderer2.removeClass(this.navElement.nativeElement , 'px-5')
    this._Renderer2.removeClass(this.navElement.nativeElement , 'shadow')

  }
}



  
  signOut(){
    this._AuthService.signOut()
  }

  closeNav(){
    this.menuValue=false
  }

}
