import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SweetAlert2LoaderService } from '@sweetalert2/ngx-sweetalert2';
import { AuthClientService } from 'src/app/services/auth-client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  password!: string ;
  email!: string ;
  constructor(private authClient:AuthClientService,
              private router:Router,
              private swal:SweetAlert2LoaderService){}
  ngOnInit(){
    
  }
  onRegister(){
      
    this.authClient.register(this.email, this.password)
    .then(register =>{
      if(register){
        Swal.fire({
          icon: 'success',
          title: 'Congratulation you are logged!',
          timer: 4000
        });
        this.router.navigate(['/']);
      } else {
        // Authentification échouée (cette condition dépend de la logique de votre service d'authentification)
        Swal.fire({
          icon: 'error',
          title: 'Oups...',
          text: 'La connexion a échoué. Veuillez vérifier vos identifiants et réessayer.',
          footer: 'Une erreur inattendue est survenue.'
        });
      }
    })
    .catch(error => {
      console.error('Erreur d\'authentification :', error);

      // Gestion des erreurs Firebase
      let errorMessage = 'Une erreur s\'est produite lors de la connexion.';

      if (error.code === 'auth/invalid-login-credentials') {
        errorMessage = 'Identifiants invalides. Veuillez vérifier votre e-mail et votre mot de passe.';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'Utilisateur non trouvé. Veuillez vérifier votre e-mail et réessayer.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Mot de passe incorrect. Veuillez vérifier votre mot de passe et réessayer.';
      }

      Swal.fire({
        icon: 'error',
        title: 'Oups...',
        text: errorMessage,
        footer: 'Veuillez corriger les erreurs et réessayer.'
      });
    });
  }


      }

 
