import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginform !: FormGroup
  // appUser!:AppUser
  messageError !: string
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private route: Router,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.loginform = this.formBuilder.group(
      {
        username: this.formBuilder.control(""),
        password: this.formBuilder.control("")
      }
    )

  }



  onSubmit() {

    let usename =  this.loginform.value.username
    let password = this.loginform.value.password
    this.authService.login(usename, password).subscribe({
      next: (appUser) => {
        this.authService.authenticatUser(appUser).subscribe(

          () => {
            this.toastr.success( '', 'Successfully logged-in !', { closeButton: true, positionClass: "toast-top-center" });

            this.route.navigateByUrl('/')
          }

        )

      },
      error: (e) => {
        this.toastr.warning( '', e, { closeButton: true, positionClass: "toast-top-center" });
        this.messageError = e
      }
    })
  }

}
