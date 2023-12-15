import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-hearder',
  templateUrl: './hearder.component.html',
  styleUrls: ['./hearder.component.css']
})
export class HearderComponent implements OnInit {
  userEmail: string = ''
  isLoggedIn$ = new Observable<boolean>();

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userEmail = JSON.parse(localStorage.getItem('user')!).email;

    this.isLoggedIn$ = this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logOut();
  }
}
