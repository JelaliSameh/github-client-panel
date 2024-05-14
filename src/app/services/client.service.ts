import { query } from '@angular/animations';
import { Client } from './../models/client'
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';


@Injectable()
export class ClientService {
  clientsCollection: AngularFirestoreCollection<Client>;
  clientDoc!: AngularFirestoreDocument<Client>;

  constructor(private afs: AngularFirestore) {

    this.clientsCollection =this.afs.collection('clients');
   }


   getClients(user:string): Observable<Client[]>{ 
    return this.afs.collection('clients', ref => ref.where('user', '==', user)).snapshotChanges().pipe(
      map(actions =>{return actions.map(a => {
        const data = a.payload.doc.data() as Client;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    })
    )
      }
newClient(client: Client){
 this.clientsCollection.add(client);
}

getClient(id: string): Observable<Client> {
  return this.clientsCollection.doc(id).valueChanges().pipe(
    map((client: Client | undefined) => {
      if (client) {
        return client;
      } else {
        console.error(`Le client avec l'ID ${id} n'a pas été trouvé.`);
        return {} as Client;
      }
    })
  );
}



updateClient(client:Client){
  this.clientDoc= this.clientsCollection.doc(client.id);
  this.clientDoc.update(client);
}
deleteClient(id:string){
  this.clientDoc= this.clientsCollection.doc(id);
  this.clientDoc.delete();

}
   }

