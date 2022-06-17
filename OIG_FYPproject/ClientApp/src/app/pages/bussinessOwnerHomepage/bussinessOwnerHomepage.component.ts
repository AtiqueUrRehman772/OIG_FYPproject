import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BusinessService } from '../services/business/business.service';
import { GetAllUsersService } from '../services/getUsers/getAllUsers.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GetRequestsService } from '../services/getRequests/getRequests.service';

declare const $:any;
@Component({
  selector: 'app-bussinessOwnerHomepage',
  templateUrl: './bussinessOwnerHomepage.component.html',
  styleUrls: ['./bussinessOwnerHomepage.component.css']
})
export class BussinessOwnerHomepageComponent implements OnInit {

  constructor(private requestSerice:GetRequestsService,private getAllUsers: GetAllUsersService, private businessService: BusinessService,private addBusinessService:BusinessService, private router: Router) { }
  users: any;
  userName:any;
  business:any;
  closedBusiness:any;
  time: any;
  businessInfo:any;
  investmentRequestList:any
  investorsList:any;
  investorInfo:any ={userName:'',email:'',since:'',country:''};
  profile:boolean = false;
  showLoader: boolean = true;
  showLoader1: boolean = false;
  showBusinessInfo: boolean = false;
  businessDtls: boolean = true;
  toggleListArrow: boolean = false;
  investmentRequests: boolean = false;
  showInvestmentRequestHistory:boolean = false;
  selectedOption: string;
  bCategories:any = ["Food","Vehicles","Property"];
  countries:any = ["Pakistan","Turkey","China","Saudi Arabia","Qatar","England","Germany"];
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
    $("#offcanvas-Investors").hide();
    $("#offcanvas-investmentRequests").hide();
    $("#offcanvas-InvestorInfo").hide();
    $("#offcanvas-closedBusiness").hide();
    setTimeout(() => {
      this.showLoader = false;
    }, 750);
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
    this.profile = true;
  }
  hideProfile(){
    this.profile = false;
  }
  getUserId(){
    this.getAllUsers.getUserId().subscribe(
      data => {
        if (sessionStorage.getItem('Id') == null){
          this.router.navigateByUrl("/login");
        }
        //console.warn(data);
        this.users = data;
        this.userName = this.users.email.split('@');
        this.getMyBusinesses();
        console.log(this.userName);
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
        //console.warn(data);
        if (data){
          Swal.fire(
            'Operation Successful !',
            'Business Added Successfully !',
            'success'
          )
        }
        this.getMyBusinesses();
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
        //console.warn(this.business);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  revealClosedBusiness(){
    this.getClosedBusiness();
    $("#offcanvas-closedBusiness").show();
    $('#offcanvas-closedBusiness').css({ 'width': '81%', 'position': 'absolute' });
  }
  hideClosedBusiness(){
    $('#offcanvas-closedBusiness').css({ 'width': '0%'});
    setTimeout(() => {
      $("#offcanvas-closedBusiness").hide();
    }, 550);
  }
  getClosedBusiness(){
    //console.log(this.users);
    this.addBusinessService.getClosedBusiness(this.users.email)
    .subscribe(
      data => {
        this.closedBusiness = data;
        //console.warn(this.business);
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
  markComplete(bid:any){
    this.businessService.markComplete(bid).subscribe(
      data => {
        Swal.fire(
          'Operation Successful !',
          'Business Closed !',
          'success'
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }
  revealInvestors(bId:any){
    this.getAllUsers.revealInvestors(bId).subscribe(
      data => {
        this.businessDtls = false;
        this.investorsList = data;
        this.showBusinessInfoDiv();
      },
      (error) => {
        console.error(error);
      }
    );
    $("#offcanvas-Investors").show();
    $('#offcanvas-Investors').css({ 'width': '81%', 'position': 'absolute' });
  }
  hideInvestors(){
    $('#offcanvas-Investors').css({ 'width': '0%'});
    setTimeout(() => {
      $("#offcanvas-Investors").hide();
    }, 550);
  }
  revealInvestorInfo(userName:string,email:string,since:string,country:string){
    this.investorInfo.userName = userName;
    this.investorInfo.email = email;
    this.investorInfo.since = since;
    this.investorInfo.country = country;
    $("#offcanvas-InvestorInfo").show();
    $('#offcanvas-InvestorInfo').css({ 'width': '81%', 'position': 'absolute' });
  }
  hideInvestorInfo(){
    $('#offcanvas-InvestorInfo').css({ 'width': '0%'});
    setTimeout(() => {
      $("#offcanvas-InvestorInfo").hide();
    }, 500);
  }
  revealInvestmentRequests(){
    $("#offcanvas-investmentRequests").show();
    $('#offcanvas-investmentRequests').css({ 'width': '81%', 'position': 'absolute' });
  }
  hideInvestmentRequests(){
    $('#offcanvas-investmentRequests').css({ 'width': '0%'});
    setTimeout(() => {
      $("#offcanvas-investmentRequests").hide();
    }, 500);
  }
  showinvestmentRequests(){
    this.investmentRequests = true;
  }
  getInvestmentRequests(){
    this.requestSerice.getInvestmentRequests(this.users.email).subscribe(
      data => {
        this.showInvestmentRequestHistory = false;
        this.revealInvestmentRequests();
        this.investmentRequestList = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getInvestmentRequestsHistory(){
    this.revealInvestmentRequests();
    this.requestSerice.getInvestmentRequestsHistory(this.users.email).subscribe(
      data => {
        this.investmentRequestList = data;
        this.showInvestmentRequestHistory = true;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  activate(id: any, id2: any, id3: any) {
    if (this.toggleListArrow) {
      this.deactivate(id, id2, id3);
    }
    else {
      this.toggleListArrow = true;
      $('#' + id).css({ 'background-color': '#f5f7fa' });
      $('#' + id3).css({ 'transform': 'rotate(90deg)', 'transition': 'all 0.5s' });
      $('#' + id2).toggleClass("navItems-customchange");
    }
  }
  deactivate(id: any, id2: any, id3: any) {
    this.toggleListArrow = false;
    $('#' + id).css({ 'background-color': 'white' });
    $('#' + id3).css({ 'transform': 'rotate(0deg)', 'transition': 'all 0.5s' });
    $('#' + id2).toggleClass("navItems-customchange");
  }
  acceptInvestmentRequest(userId:any,bId:any){
    this.requestSerice.acceptInvestmentRequest(userId,bId,this.users.email).subscribe(
      data => {
        this.getInvestmentRequests();
        Swal.fire(
          'Operation Successful !',
          'Request Accepted !',
          'success'
        );
        //console.log('success');
      },
      (error) => {
        console.error(error);
      }
    );
  }
  declineInvestmentRequest(userId:any,bId:any){
    this.requestSerice.declineInvestmentRequest(userId,bId,this.users.email).subscribe(
      data => {
        this.getInvestmentRequests();
        Swal.fire(
          'Operation Successful !',
          'Request Declined !',
          'success'
        )
        //console.log('decline');
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
