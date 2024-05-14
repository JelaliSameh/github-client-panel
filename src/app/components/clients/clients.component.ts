import { Component,OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SweetAlert2LoaderService } from '@sweetalert2/ngx-sweetalert2';
import { AuthClientService } from 'src/app/services/auth-client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients!:Client[];
  total: number =0 ;
  constructor(private clientService: ClientService,
              private router:Router,
              private authClientService:AuthClientService,
              private swal: SweetAlert2LoaderService ){}
    ngOnInit() {/*
                this.authClientService.getAuth().subscribe((auth) => {
                  if (auth) { // Assurez-vous que auth est défini avant d'accéder à uid
                    this.clientService.getClients(auth.uid).subscribe((clients) => {
                      this.clients = clients;
                      this.total = this.getTotal();
                    });
                  }
                });*/
              }
            
  getTotal(){
    return this.clients.reduce((total, client) => { 
      return total +parseFloat (client.balance.toString());
    }, 0)
  }
  deleteClient(id: any){
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
