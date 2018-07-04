import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tnc-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  name: string = "";
  email: string = "";
  zipcode: string = "";
  password: string = "";

  validationErrors : string[] = null;

  constructor() { }

  ngOnInit() {
    this.validationErrors = null;
  }

  doSignup() {
    this.validationErrors = null;
    alert("Sorry, not actually implemented. Nothing went wrong though!");
  }

  showErrors(messages: string[]) {
    this.validationErrors = messages;
  }
}
