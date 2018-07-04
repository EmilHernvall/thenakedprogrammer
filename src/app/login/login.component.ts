import { Component, OnInit, Input } from '@angular/core';
import { User } from '../model/user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'tnc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() currentUser : User = null;

  email: string = "";
  password: string = "";

  error: string = null;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  doLogin() {
    this.authService.tryAuth(this.email, this.password)
      .subscribe(res => {
        if (!res.ok) {
          this.error = res.message;
        } else {
          this.error = null;
          this.email = "";
          this.password = "";
        }
      });
  }
}
