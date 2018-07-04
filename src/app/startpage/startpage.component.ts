import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../model/user';

@Component({
  selector: 'tnc-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.css']
})
export class StartpageComponent implements OnInit {

  currentUser : User = null;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getCurrentUser()
      .subscribe(user => this.currentUser = user);
  }
}
