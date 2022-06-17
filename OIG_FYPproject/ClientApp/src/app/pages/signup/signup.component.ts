import { Component, OnInit } from "@angular/core";
import { UserRegisterService } from "../services/register/userRegister.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import * as internal from "assert";
import Swal from "sweetalert2";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  constructor(private userRegister: UserRegisterService, private router: Router) { }
  ngOnInit() {
    setTimeout(() => {
      this.showLoader = false;
    }, 550);
    this.passLength = 0;
  }
  //////////  ----   Reactive Form (Register)   ----  //////////
  registerForm = new FormGroup({
    userName: new FormControl("",Validators.required),
    password: new FormControl("",Validators.required),
    email: new FormControl("",Validators.required),
    userType: new FormControl(""),
    country: new FormControl("")
  });
  pass:string;
  passLength:number;
  accountType:any = ["Business Owner","Investor","Advisor"];
  countries:any = ["Pakistan","Turkey","China","Saudi Arabia","Qatar","England","Germany"];
  showLoader: boolean = true;
  result: boolean;
  x:any;
  passLengthUpdate(){
    // this.passLength = this.passLength + 1;
    // console.log(this.passLength);
    this.pass = this.registerForm.value.password;
    this.passLength = this.pass.length;
    if (this.passLength > 5){
      const passElement = document.getElementById("loginForm");
      passElement.style.height = "550px";
    }
    else {
      const passElement = document.getElementById("loginForm");
      passElement.style.height = "500px";
    }
  }
  registerUser() {
    //console.warn(this.registerForm.value);
    this.userRegister
      .registerUser(
        this.registerForm.value.userName,
        this.registerForm.value.email,
        this.registerForm.value.password,
        this.registerForm.value.userType,
        this.registerForm.value.country,
      )
      .subscribe(
        (data) => {
          console.log(data);
          this.x = data;
          if (this.x.description == 'False') {
            //alert('This Email is already in use!! Please Use Another Email . . . ');
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              footer: '<a href>Why do I have this issue?</a>'
            })
          }
          else if(this.x.description == 'Please select an Account type !'){
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Please select an Account type !',
              footer: '<a href>Why do I have this issue?</a>'
            })
          }
          else if(this.x.description == 'Please select your Country !'){
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Please select your Country !',
              footer: '<a href>Why do I have this issue?</a>'
            })
          }
          else {
            this.router.navigateByUrl("/login");
          }
        },
        (error) => {
          console.error(error);
        }
      );
  }
  erroalert() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: '<a href>Why do I have this issue?</a>'
    })
  }
}
