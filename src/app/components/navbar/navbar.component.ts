import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { SweetAlert2LoaderService } from '@sweetalert2/ngx-sweetalert2';
import { AuthClientService } from 'src/app/services/auth-client.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean=false;
  userLoggedIn!: string;
  constructor (private authService:AuthClientService,
               private swal:SweetAlert2LoaderService,
               private router:Router){}
           

               ngOnInit(): void {
                this.authService.getAuth().subscribe(auth => {
                  if (auth) {
                    this.isLoggedIn = true;
                    this.userLoggedIn = auth.email ?? ''; // Use an empty string as the default value
                  } else {
                    this.isLoggedIn = false;
                    this.userLoggedIn = ''; // Set to an appropriate default value when not logged in
                  }
                });
              }
              
              
  onLogOut(){
    this.authService.logOut();
    return this.router.navigate(['/login'])
}

}
