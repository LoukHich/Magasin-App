import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppUser } from '../modele/appUser.modele';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
var bootstrap:any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user!:AppUser

  constructor(public  authService:AuthService ,private route:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
  }
  handlelogout(){
     this.authService.logout().subscribe(
       ()=>{
        this.route.navigateByUrl('/')
      }
     )
    // this.route.navigateByUrl('/')

  }
  ngAfterViewInit(): void {
    document.addEventListener('load', function(){
      const tooltipTriggerList:any = document.querySelectorAll('[data-bs-toggle="tooltip"]')
      const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    })
  }
  login(){

    this.route.navigateByUrl('/login')

  }
  qliq(){

       this.toastr.info( "You can't yet register ...", "register not yet available")

  }
}
