import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SweetAlert2LoaderService } from '@sweetalert2/ngx-sweetalert2';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {


  id!: string;
  client: Client={
    firstName:'',
    lastName:'',
    email:'',
    phone:0,
    balance:0,

  };
  constructor(
private clientService: ClientService,
private route: ActivatedRoute,
private router: Router,
private swal: SweetAlert2LoaderService
  ){
  
}

ngOnInit() {
  this.id = this.route.snapshot.params['id'];
  this.clientService.getClient(this.id).subscribe(client => {
    if (client) {
      this.client = client;
    } else {
    
      console.error("Le client est null ou undefined.");
    }
    console.log(this.client);
  })
}

onSubmit() {

 this.client.id = this.id; 
this.clientService.updateClient(this.client);
Swal.fire({
  title: "successfully",
  text: "client updated",
  icon: "success",
  timer: 4000
});
return this.router.navigate(['/']);


  }

}