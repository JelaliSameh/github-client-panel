import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs';
import { GoogleAuthProvider } from "firebase/auth";

@Injectable()
export class AuthClientService {
  
  constructor(private afAuth: AngularFireAuth) { }


  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(email, password)
   .then((userData) => resolve(userData), (error) =>reject(error));

    
    });
  
}
register(email: string, password: string) {
  return new Promise((resolve, reject) => {
    this.afAuth.createUserWithEmailAndPassword(email, password)
 .then((userData) => resolve(userData), (error) =>reject(error));

  
  });

}
loginWithGoogle() {
  return new Promise((resolve, reject) => {
    this.afAuth.signInWithPopup(new GoogleAuthProvider())
 .then((userData) => resolve(userData), (error) =>reject(error))

  
  })

}

getAuth() {
  return this.afAuth.authState.pipe(map(auth =>auth)) ;
}

logOut(){
  this.afAuth.signOut();
}
  }





