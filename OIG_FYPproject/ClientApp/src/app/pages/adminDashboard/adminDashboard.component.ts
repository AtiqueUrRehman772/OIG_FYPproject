import { Component, OnInit } from '@angular/core';
import { GetRequestsService } from '../services/getRequests/getRequests.service';
import Swal from 'sweetalert2';
import { GetAllUsersService } from '../services/getUsers/getAllUsers.service';
import { GetInvestorsService } from '../services/getUsers/getInvestors.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminDashboard',
  templateUrl: './adminDashboard.component.html',
  styleUrls: ['./adminDashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private getInvestor: GetInvestorsService, private router: Router, private getRequests: GetRequestsService, private getAllUsers: GetAllUsersService) { }

  ngOnInit() {
    //console.log(sessionStorage.getItem('Id'));
    if (sessionStorage.getItem('Id') == null){
      this.router.navigateByUrl("/login");
    }
    setTimeout(() => {
      this.showLoader = false;
    }, 750);
    this.getTime();
    this.reloader();
    this.getUserCount();
    this.getRequestCount();
    this.getAccCount();
    this.getDecCount();
  }
  reloader() {
    setTimeout(() => { this.reloader(); this.getTime(); }, 1000);
  }

  //////////// -------    Variables  ------ //////////
  showLoader: boolean = true;
  showLoader1: boolean = false;
  showRqTbl: boolean = false;
  showUserTbl: boolean = false;
  showAll: boolean = false;
  requests: any;
  users: any;
  usersEditModal: any;
  usersCount: any;
  requestCount: any;
  requestAccCount: any;
  requestDecCount: any;
  time: any;
  count:number = 0;


  //////////// ------  Get Details Functions   ------ ///////////
  getUsers() {
    this.showLoader1 = true;
    setTimeout(() => {
      this.showLoader1 = false;
    }, 400);
    this.showRqTbl = false;
    this.showUserTbl = true;
    this.showAll = false;
    this.getAllUsers.getAllUsers().subscribe(
      data => {
        this.users = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getInvestorRequests() {
    this.showLoader1 = true;
    setTimeout(() => {
      this.showLoader1 = false;
    }, 400);
    this.showRqTbl = true;
    this.showUserTbl = false;
    this.showAll = false;
    //debugger;
    this.getRequests.getInvestorRequests().subscribe(
      data => {
        this.requests = data;
        console.warn(this.requests);
      },
      (error) => {
        console.error(error);
      }
    );
    //console.warn(this.requests);
  }
  getAdvisorRequests() {
    this.showLoader1 = true;
    setTimeout(() => {
      this.showLoader1 = false;
    }, 400);
    this.showRqTbl = true;
    this.showUserTbl = false;
    this.showAll = false;
    //debugger;
    this.getRequests.getAdvisorRequests().subscribe(
      data => {
        this.requests = data;
        console.warn(this.requests);
      },
      (error) => {
        console.error(error);
      }
    );
    //console.warn(this.requests);
  }
  getOwnerRequests() {
    this.showLoader1 = true;
    setTimeout(() => {
      this.showLoader1 = false;
    }, 400);
    this.showRqTbl = true;
    this.showUserTbl = false;
    this.showAll = false;
    //debugger;
    this.getRequests.getOwnerRequests().subscribe(
      data => {
        this.requests = data;
        console.warn(this.requests);
      },
      (error) => {
        console.error(error);
      }
    );
    //console.warn(this.requests);
  }
  getAllRequests() {
    this.showLoader1 = true;
    setTimeout(() => {
      this.showLoader1 = false;
    }, 400);
    this.showRqTbl = true;
    this.showUserTbl = false;
    this.showAll = true;
    //debugger;
    this.getRequests.getAllRequests().subscribe(
      data => {
        this.requests = data;
        console.warn(this.requests);
      },
      (error) => {
        console.error(error);
      }
    );
    //console.warn(this.requests);
  }
  getInvestors() {
    this.showLoader1 = true;
    setTimeout(() => {
      this.showLoader1 = false;
    }, 400);
    this.showRqTbl = false;
    this.showUserTbl = true;
    this.getInvestor.getInvestors().subscribe(
      data => {
        console.warn(data);
        this.users = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getAdvisors() {
    this.showLoader1 = true;
    setTimeout(() => {
      this.showLoader1 = false;
    }, 400);
    this.showRqTbl = false;
    this.showUserTbl = true;
    this.getInvestor.getAdvisors().subscribe(
      data => {
        console.warn(data);
        this.users = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getUserCount() {
    this.getAllUsers.getUserCount().subscribe(
      data => {
        this.usersCount = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getRequestCount() {
    this.getRequests.getRequestCount().subscribe(
      data => {
        this.requestCount = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getAccCount() {
    this.getRequests.getAccCount().subscribe(
      data => {
        this.requestAccCount = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getDecCount() {
    this.getRequests.getDecCount().subscribe(
      data => {
        this.requestDecCount = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getTime() {
    //debugger;
    this.getAllUsers.getTime().subscribe(
      data => {
        //console.warn(data);
        this.time = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  /////////// -------   Extra   Functions   --------  ////////////
  userModal: any = { userName: "", userEmail: "", userPassword: "" };
  editUserForm = new FormGroup({
    userName: new FormControl(),
    password: new FormControl(),
    email: new FormControl()
  });
  get userName(){
    return this.editUserForm.get('userName');
  }
  get password(){
    return this.editUserForm.get('password');
  }
  get email(){
    return this.editUserForm.get('email');
  }
  fillModal(userName: any, userEmail: any, userPassword: any) {
    this.userModal.userName = userName;
    this.userModal.userEmail = userEmail;
    this.userModal.userPassword = userPassword;
    //console.warn(this.userModal);
    //this.usersEditModal.userRole = userRole;
  }
  editUserDetails(){
    a:String;b:String;c:String;
    if (this.editUserForm.value.userName == null){
      this.editUserForm.value.userName = this.userModal.userName;
    }
    if (this.editUserForm.value.password == null){
      this.editUserForm.value.password = this.userModal.userPassword;
    }
    this.getAllUsers.editUserDetails(this.editUserForm.value.userName,this.userModal.userEmail,this.editUserForm.value.password).subscribe(
      data => {
        this.alertWithSuccess();
        //this.time = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  deleteUser(reqId: any, role: any) {
    Swal.fire({
      title: 'Are you sure want to decline?',
      text: 'You will not be able to undo this action!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, decline it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {
        this.getAllUsers.deleteUser(reqId).subscribe(
          data => {
            this.getUsers();
          },
          (error) => {
            console.error(error);
          }
        );
        Swal.fire(
          'Deleted!',
          'User has been deleted !',
          'success'
        )
        this.getUserCount();
        this.getRequestCount();
        this.getAccCount();
        this.getDecCount();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Request is still pending !)',
          'error'
        )
      }
    })
  }
  hideRqTbl() {
    this.showRqTbl = false;
  }
  hideUserTbl() {
    this.showUserTbl = false;
  }
  logout(){
    sessionStorage.removeItem('Id');
    this.router.navigateByUrl("/login");
  }
  /////////// -------   SWAL   Functions   --------  ////////////
  alertWithSuccess() {
    Swal.fire('Thank you...', 'Operation successfull!', 'success')
  }
  erroalert() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: '<a href>Why do I have this issue?</a>'
    })
  }
  topend() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
  }
  declineRequest(reqId: any, role: any) {
    Swal.fire({
      title: 'Are you sure want to decline?',
      text: 'You will not be able to undo this action!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, decline it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {
        this.getRequests.declineRequest(reqId).subscribe(
          data => {
            if (role == "investor") {
              this.getInvestorRequests();
            }
            else if (role == "advisor") {
              this.getAdvisorRequests();
            }
            this.requests = data;
          },
          (error) => {
            console.error(error);
          }
        );
        Swal.fire(
          'Declined!',
          'Request has been declined !',
          'success'
        )
        this.getUserCount();
        this.getRequestCount();
        this.getAccCount();
        this.getDecCount();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Request is still pending !',
          'error'
        )
      }
    })
  }
  acceptRequest(reqId: any, role: any) {
    Swal.fire({
      title: 'Are you sure want to Accept?',
      text: 'You will not be able to undo this action!',
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Yes, Accept it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {
        this.getRequests.acceptRequest(reqId).subscribe(
          data => {
            console.log(role);
            if (role == "Investor") {
              this.getInvestorRequests();
            }
            else if (role == "Advisor") {
              this.getAdvisorRequests();
            }
            else if (role == "owner") {
              //console.log('asjhdasjdhw');
              this.getOwnerRequests();
            }
          },
          (error) => {
            console.error(error);
          }
        );
        Swal.fire(
          'Accepted!',
          'Request has been Accepted !',
          'success'
        )
        this.getUserCount();
        this.getRequestCount();
        this.getAccCount();
        this.getDecCount();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Request is still pending !',
          'error'
        )
      }
    })
  }
}
