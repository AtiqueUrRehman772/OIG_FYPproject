import { Component, OnInit } from '@angular/core';
import { GetAllUsersService } from '../services/getUsers/getAllUsers.service';
import { Router } from '@angular/router';
import { GetRequestsService } from '../services/getRequests/getRequests.service';
import { BusinessService } from '../services/business/business.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-advisorHomePage',
  templateUrl: './advisorHomePage.component.html',
  styleUrls: ['./advisorHomePage.component.css']
})
export class AdvisorHomePageComponent implements OnInit {

  constructor(private getAllUsers: GetAllUsersService, private getRequests: GetRequestsService, private businessService:BusinessService, private router: Router) { }

  /////////// --------   Variables  -------- ///////////
  bCat = new FormGroup({
    category: new FormControl("")
  });
  userEdit = new FormGroup({
    userName: new FormControl(""),
    contact: new FormControl(""),
    firmName: new FormControl(""),
    skills: new FormControl(""),
    description: new FormControl("")
  });
  riskPercentage:any;
  users: any;
  risk:any;
  business: any;
  profileEdit:boolean = false;
  profile:boolean = false;
  profileDetails: any;
  skills:any;
  time: any;
  showLoader: boolean = true;
  showLoader1: boolean = false;
  tblHiringRequests: boolean = false;
  tblBusiness: boolean = false;
  hiringRequests:any;
  ngOnInit() {
    if (sessionStorage.getItem('Id') == null){
      this.router.navigateByUrl("/login");
    }
    setTimeout(() => {
      this.showLoader = false;
    }, 750);
    this.getProfile();
    this.getUserId();
    this.getTime();
    this.reloader();
  }
  reloader(){
    setTimeout(()=>{this.reloader();this.getTime();},1000);
  }
  getTime() {
    this.getAllUsers.getTime().subscribe(
      data => {
        this.time = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  showProfile(){
    this.getProfile();
    this.profile = true;
  }
  hideProfile(){
    this.profile = false;
  }
  getUserId(){
    this.getAllUsers.getUserId().subscribe(
      data => {
        console.warn(data);
        this.users = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getAllBusiness(){
    this.showLoader1 = true;
    setTimeout(() => {
      this.showLoader1 = false;
    }, 400);
    this.businessService.getAllBusiness().subscribe(
      data => {
        this.showBusiness();
        this.business = data;
        //console.warn(this.business);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getFilteredBusiness(){
    this.showLoader1 = true;
    setTimeout(() => {
      this.showLoader1 = false;
    }, 400);
    this.businessService.getFilteredBusiness(this.riskPercentage,this.bCat.value.category).subscribe(
      data => {
        this.showBusiness();
        this.business = data;
        //console.warn(this.business);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  showBusiness() {
    this.showLoader1 = true;
    setTimeout(() => {
      this.showLoader1 = false;
    }, 400);
    this.tblBusiness = true;
    this.profile = false;
    this.tblHiringRequests = false;
  }
  hideHiringRequests(){
    this.tblHiringRequests = false;
  }
  getHiringRequests(){
    this.getRequests.getHiringRequests(this.users.email).subscribe(
      data => {
        //console.warn(data);
        this.tblHiringRequests = true;
        this.hiringRequests = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getRequestsHistory(){
    this.getRequests.getRequestsHistory(this.users.email).subscribe(
      data => {
        //console.warn(data);
        this.tblHiringRequests = true;
        this.hiringRequests = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  hideBusiness(){
    this.tblBusiness = false;
  }
  getAdvisorBusiness(){
    this.showLoader1 = true;
    setTimeout(() => {
      this.showLoader1 = false;
    }, 400);
    this.businessService.getAdvisorBusiness(this.users.email).subscribe(
      data => {
        this.showBusiness();
        this.business = data;
        console.warn(this.business);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  rateRisk(bId:string){
    this.showLoader1 = true;
    setTimeout(() => {
      this.showLoader1 = false;
    }, 400);
    this.businessService.rateRisk(bId,this.risk).subscribe(
      data => {
        this.getAdvisorBusiness();
        alert('Rated Successfully !!');
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getProfile(){
    this.showLoader1 = true;
    setTimeout(() => {
      this.showLoader1 = false;
    }, 400);
    this.getAllUsers.getAdvisorProfile().subscribe(
      data => {
        console.warn(data);
        this.profileDetails = data;
        this.skills = this.profileDetails.skills.split(",");
        console.warn(this.skills);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  editProfile(){
    this.userEdit.value.userName = this.profileDetails.userName;
    this.userEdit.value.contact = this.profileDetails.contact;
    this.userEdit.value.firmName = this.profileDetails.firmName;
    this.userEdit.value.skills = this.profileDetails.skills;
    this.userEdit.value.description = this.profileDetails.description;
    console.log(this.userEdit.value);
    this.profileEdit = true;
  }
  showProgressSummary(){
    this.profileEdit = false;
  }
  updateProfileChanges(){
    console.log(this.userEdit.value);
    this.getAllUsers.editProfile(this.users.email,this.userEdit.value.userName,this.userEdit.value.contact,this.userEdit.value.firmName,
      this.userEdit.value.skills,this.userEdit.value.description).subscribe(
      data => {

        this.getProfile();
      },
      (error) => {
        console.error(error);
      }
    );
  }
  acceptHiringRequest(reqEmail:string){
    this.getRequests.acceptHiringRequest(this.users.email,reqEmail).subscribe(
      data => {
        //console.warn(data);
        this.tblHiringRequests = true;
        this.getHiringRequests();
      },
      (error) => {
        console.error(error);
      }
    );
  }
  rejectHiringRequest(reqEmail:string){
    this.getRequests.rejectHiringRequest(this.users.email,reqEmail).subscribe(
      data => {
        //console.warn(data);
        this.tblHiringRequests = true;
        this.getHiringRequests();
      },
      (error) => {
        console.error(error);
      }
    );
  }
  logout(){
    sessionStorage.removeItem('Id');
    this.router.navigateByUrl("/login");
  }
}
