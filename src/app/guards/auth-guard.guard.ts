import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CanActivateFn, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  canActivate(): Observable <boolean> {
    // Utilisez this.afAuth au lieu de créer une nouvelle instance
    return this.afAuth.authState.pipe(
      map(auth => {
        if (!auth) {
          this.router.navigate(['/login']);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
