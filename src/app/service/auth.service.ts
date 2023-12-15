import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  IsLoggedGuard: boolean = false;

  constructor(
    private fa: AngularFireAuth,
    private tostar: ToastrService,
    private router: Router
  ) { }

  login(email: string, password: string) {
    return this.fa.signInWithEmailAndPassword(email, password).then((user) => {
      this.tostar.success("Login Successfully");
      this.loadUser();
      this.loggedIn.next(true);
      this.IsLoggedGuard = true;
      this.router.navigate(['/']);
    }).catch((error) => {
      this.tostar.warning("Invalid Email or Password");
    })
  }

  loadUser() {
    return this.fa.authState.subscribe((user) => {
      localStorage.setItem('user', JSON.stringify(user));
    })
  }

  logOut() {
    return this.fa.signOut().then(() => {
      this.tostar.success("Logout Successfully");
      localStorage.removeItem('user');
      this.loggedIn.next(false);
      this.IsLoggedGuard = false;
      this.router.navigate(['/login']);

    }).catch((error) => {
      this.tostar.warning("Logout Failed");
    })
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }
}
