import { CanActivateFn, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { inject } from '@angular/core';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => 
{
  const afAuth = inject(AngularFireAuth);
  const router = inject(Router);
  
  
  return afAuth.authState.pipe(
    map((auth: any) => {
      if (!auth) {
        // Rediriger vers la page de connexion
        // Utilisez state.url pour rediriger vers la page demandée après la connexion
        router.navigate(['/login']);
        return false;
      } else {
        return true;
      }
    })
  );
};
