import { Client } from 'src/app/models/client';
import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SweetAlert2LoaderService } from '@sweetalert2/ngx-sweetalert2';
import { AuthClientService } from 'src/app/services/auth-client.service';
import { auth } from 'google-auth-library';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  client: Client = {
    firstName: "",
    lastName: "",
    email: "",
    phone: 0,
    balance:0,
    user:''
  }

constructor(private clientService: ClientService,
            private swal: SweetAlert2LoaderService,
            private authClientService:AuthClientService,
            private route: Router){ }

ngOnInit(){
  this.authClientService.getAuth().subscribe(auth =>{
   this.client.user= auth!.uid
  })

}
onSubmit(){
  this.clientService.newClient(this.client); 
  Swal.fire('Client added successfully');
  return this.route.navigate(['/']);
}
}

