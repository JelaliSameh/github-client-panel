import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SweetAlert2LoaderService } from '@sweetalert2/ngx-sweetalert2';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-details-client',
  templateUrl: './details-client.component.html',
  styleUrls: ['./details-client.component.css']
})
export class DetailsClientComponent implements OnInit {
  id!: string;
  
  client!: Client;
 showBalance:boolean=false;

  constructor(
private clientService: ClientService,
private route: ActivatedRoute,
private router: Router,
private swal: SweetAlert2LoaderService
  ){}
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
onSubmit()  {
  this.client.id=this.id;
  this.clientService.updateClient(this.client);
  Swal.fire({
    title: "successfully",
    text: "balance updated",
    icon: "success",
    timer: 4000
  });
  return this.router.navigate(['/']);

}
deleteClient(id:string){
Swal.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
}).then((result) => {
  if (result.isConfirmed) {

    this.clientService.deleteClient(id);
    //this.flashMessage.show('Client deleted Successfully', { cssClass: 'alert-danger', timeout: 4000 });
    this.router.navigate(['/']);

    Swal.fire(
      'Deleted!',
      'This Client has been deleted.',
      'success',

    )
  }
})
return this.router.navigate(['/']);


}
}