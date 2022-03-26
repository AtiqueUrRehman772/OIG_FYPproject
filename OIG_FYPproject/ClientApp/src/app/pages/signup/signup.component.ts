import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string){
    http.post("https://localhost:44325/api/User/login",{'q':'Atique'}).subscribe(result => {
    }, error => console.error(error));
  }

  ngOnInit() {
  }

  
}
