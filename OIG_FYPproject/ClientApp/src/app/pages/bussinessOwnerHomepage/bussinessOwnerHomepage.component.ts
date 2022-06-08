import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BusinessService } from '../services/business/business.service';
import { GetAllUsersService } from '../services/getUsers/getAllUsers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bussinessOwnerHomepage',
  templateUrl: './bussinessOwnerHomepage.component.html',
  styleUrls: ['./bussinessOwnerHomepage.component.css']
})
export class BussinessOwnerHomepageComponent implements OnInit {

  constructor(private getAllUsers: GetAllUsersService, private businessService: BusinessService,private addBusinessService:BusinessService, private router: Router) { }
  users: any;
  business:any;
  profile:boolean = false;
  time: any;
  businessInfo:any;
  showLoader: boolean = true;
  showLoader1: boolean = false;
  showBusinessInfo: boolean = false;
  businessDtls: boolean = true;
  selectedOption: string;
  addBusiness = new FormGroup({
    bName: new FormControl(""),
    bOwner: new FormControl(""),
    bCategory: new FormControl(""),
    bCountry: new FormControl(""),
    bCity: new FormControl(""),
    bAddress: new FormControl("")
  });
  ngOnInit() {
    if (sessionStorage.getItem('Id') == null){
      this.router.navigateByUrl("/login");
    }
    setTimeout(() => {
      this.showLoader = false;
    }, 750);
    this.getUserId();
    this.getTime();
    this.reloader();
  }
  reloader(){
    setTimeout(()=>{this.reloader();this.getTime();},1000);
    //console.warn(this.addBusiness.value);
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
    this.profile = true;
  }
  hideProfile(){
    this.profile = false;
  }
  getUserId(){
    this.getAllUsers.getUserId().subscribe(
      data => {
        //console.warn(data);
        this.users = data;
        this.getMyBusinesses();
      },
      (error) => {
        console.error(error);
      }
    );
  }
  addNewBusiness(){
    //console.log(this.addBusiness.value.bCountry);
    this.addBusinessService.addNewBusiness(this.addBusiness.value.bName,this.addBusiness.value.bOwner,this.addBusiness.value.bCategory,this.addBusiness.value.bCountry,this.addBusiness.value.bCity,this.addBusiness.value.bAddress,this.users.email)
    .subscribe(
      data => {
        console.warn(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getMyBusinesses(){
    //console.log(this.users);
    this.addBusinessService.getMyBusinesses(this.users.email)
    .subscribe(
      data => {
        this.business = data;
        console.warn(this.business);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  showBusinessInfoDiv() {
    this.showLoader1 = true;
    setTimeout(() => {
      this.showLoader1 = false;
    }, 400);
    this.profile = false;
    this.showBusinessInfo = true;
  }
  hideBusinessInfo() {
    this.showBusinessInfo = false;
    this.businessDtls = true;
  }
  getBusinessInfo(Bid: string) {
    this.showLoader1 = true;
    setTimeout(() => {
      this.showLoader1 = false;
    }, 400);
    this.businessService.getBusinessInfo(Bid).subscribe(
      data => {
        this.businessDtls = false;
        this.businessInfo = data;
        this.showBusinessInfoDiv();
        console.log(this.businessInfo);
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
