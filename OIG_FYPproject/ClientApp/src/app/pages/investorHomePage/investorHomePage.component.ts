import { Component, OnInit } from '@angular/core';
import { BusinessService } from '../services/business/business.service';
import { GetAllUsersService } from '../services/getUsers/getAllUsers.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

declare const $: any;

@Component({
  selector: 'app-investorHomePage',
  templateUrl: './investorHomePage.component.html',
  styleUrls: ['./investorHomePage.component.css']
})
export class InvestorHomePageComponent implements OnInit {

  constructor(private getAllUsers: GetAllUsersService, private businessService: BusinessService, private router: Router) { }

  /////////// --------   Variables  -------- ///////////
  bCat = new FormGroup({
    category: new FormControl("")
  });
  riskPercentage: any;
  users: any;
  time: any;
  showLoader: boolean = true;
  showLoader1: boolean = false;
  profile: boolean = false;
  showTblAdvisor: boolean = false;
  showTblBusiness: boolean = false;
  showAdvisorDetail: boolean = false;
  showAllAdvisors: boolean = true;
  showBusinessInfo: boolean = false;
  selectAdvisor: boolean = false;
  toggleListArrow: boolean = false;
  businessInfo: any;
  advisors: any;
  hiredAdvisor: any;
  associatedAdvisors: any;
  bCategories: any = ["Food", "Vehicles", "Property"];
  advisor: any = { UName: "", Email: "", Firm: "", Rating: "" };
  business: any;
  deals: any;
  profileDetails: any;
  skills: any;
  toggleEditable() {
    if (this.selectAdvisor)
      this.selectAdvisor = false;
    else
      this.selectAdvisor = true;
    $("#widchange1").toggleClass('col-1');
    $("#widchange1").toggleClass('col-4');
    $("#widchange2").toggleClass('col-11');
    $("#widchange2").toggleClass('col-8');
  }
  dealInfo = new FormGroup({
    amount: new FormControl(""),
    advisorAttached: new FormControl("")
  });
  ngOnInit() {
    if (sessionStorage.getItem('Id') == null) {
      this.router.navigateByUrl("/login");
    }
    setTimeout(() => {
      $("#offcanvas-invest").hide();
      $("#offcanvas-advisorInfo").hide();
      this.showLoader = false;
    }, 750);
    //this.getAllAdvisors();
    //this.showTblAdvisor = false;
    this.getUserId();
    this.getProfile();
    this.getTime();
    this.getAllAdvisors();
    setTimeout(() => {
      this.myDeals();
      this.hideAdvisor();
    }, 500);
    this.reloader();
  }
  reloader() {
    setTimeout(() => { this.reloader(); this.getTime(); }, 1000);
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
  getProfile() {
    this.showLoader1 = true;
    setTimeout(() => {
      this.showLoader1 = false;
    }, 400);
    this.getAllUsers.getProfile().subscribe(
      data => {
        console.warn(data);
        this.profileDetails = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  showProfile() {
    this.showLoader1 = true;
    setTimeout(() => {
      this.showLoader1 = false;
    }, 400);
    this.showTblAdvisor = false;
    this.showTblBusiness = false;
    this.showAdvisorDetail = false;
    this.businessInfo = false;
    this.profile = true;
  }
  showAdvisor() {
    this.showLoader1 = true;
    setTimeout(() => {
      this.showLoader1 = false;
    }, 400);
    this.businessInfo = false;
    this.profile = false;
    this.showTblBusiness = false;
    this.showAdvisorDetail = false;
    this.businessInfo = false;
    this.showTblAdvisor = true;
  }
  showBusiness() {
    this.showLoader1 = true;
    setTimeout(() => {
      this.showLoader1 = false;
    }, 400);
    this.profile = false;
    this.showTblAdvisor = false;
    this.showAdvisorDetail = false;
    this.businessInfo = false;
    this.showTblBusiness = true;
  }
  showBusinessInfoDiv() {
    // this.showLoader1 = true;
    // setTimeout(() => {
    //   this.showLoader1 = false;
    // }, 400);
    this.profile = false;
    this.showTblAdvisor = false;
    this.showAdvisorDetail = false;
    this.showTblBusiness = false;
    this.showBusinessInfo = true;
  }
  hideAdvisor() {
    this.showTblAdvisor = false;
  }
  hideProfile() {
    this.profile = false;
  }
  hideBusiness() {
    this.showTblBusiness = false;
    //console.log(this.riskPercentage);
  }
  hideBusinessInfo() {
    this.showBusinessInfo = false;
  }
  getUserId() {
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
  getAllAdvisors() {
    this.showLoader1 = true;
    setTimeout(() => {
      this.showLoader1 = false;
    }, 400);
    this.getAllUsers.getAllAdvisors().subscribe(
      data => {
        this.showAllAdvisors = true;
        this.showAdvisor();
        this.advisors = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getMyAdvisors() {
    this.showLoader1 = true;
    setTimeout(() => {
      this.showLoader1 = false;
    }, 400);
    this.getAllUsers.getMyAdvisors().subscribe(
      data => {
        this.showAdvisor();
        //console.warn(data);
        this.advisors = data;
        this.showAllAdvisors = false;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getAllBusiness() {
    this.showLoader1 = true;
    setTimeout(() => {
      this.showLoader1 = false;
    }, 400);
    this.businessService.getAllBusiness().subscribe(
      data => {
        this.showBusiness();
        this.business = data;
        console.log(this.bCat);
        //console.warn(this.business);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getBusiness(bCat: string) {
    this.showLoader1 = true;
    setTimeout(() => {
      this.showLoader1 = false;
    }, 400);
    this.businessService.getBusiness(bCat).subscribe(
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
  showAdvisorDetails(userName: string, userEmail: string, firmName: string) {
    this.getAllUsers.getAdvisorInfo(userEmail).subscribe(
      data => {
        this.advisor = data;
      },
      (error) => {
        console.error(error);
      }
    );
    this.revealAdvisors();
  }
  hideAdvisorDetails() {
    this.showAdvisorDetail = false;
  }
  hireAdvisor(advisorEmail: string) {
    console.log(advisorEmail);
    this.showLoader1 = true;
    setTimeout(() => {
      this.showLoader1 = false;
    }, 400);
    this.businessService.hireAdvisor(advisorEmail, this.users.email).subscribe(
      data => {
        Swal.fire(
          'Success !',
          'Your request is sent to the corresponding Advisor !',
          'success'
        )
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getBusinessInfo(Bid: string) {
    this.businessService.getBusinessInfo(Bid).subscribe(
      data => {
        this.businessInfo = data;
        this.showBusinessInfoDiv();
        //console.log(this.businessInfo);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getFilteredBusiness() {
    this.showLoader1 = true;
    setTimeout(() => {
      this.showLoader1 = false;
    }, 400);
    this.businessService.getFilteredBusiness(this.riskPercentage, this.bCat.value.category).subscribe(
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
  myDeals() {
    this.showLoader1 = true;
    setTimeout(() => {
      this.showLoader1 = false;
      this.showTblBusiness = false;
    }, 400);
    this.businessService.myDeals(this.users.email).subscribe(
      data => {
        this.deals = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  hireThisAdvisor(email: string) {
    this.hiredAdvisor = email;
  }
  makeADeal(bid: string, bOwner: string) {
    this.showLoader1 = true;
    setTimeout(() => {
      this.showLoader1 = false;
    }, 400);
    if (!this.selectAdvisor) {
      this.dealInfo.value.advisorAttached = 'Not Selected';
    }
    else {
      this.dealInfo.value.advisorAttached = this.hiredAdvisor;
    }
    console.log(this.hiredAdvisor);
    this.businessService.makeADeal(this.users.email, this.businessInfo.bId, this.businessInfo.bOwner, this.dealInfo.value.amount, this.dealInfo.value.advisorAttached).subscribe(
      data => {
        Swal.fire(
          'Success!',
          'Request sent to Business Owner !',
          'success'
        )
        setTimeout(() => {
          this.myDeals();
        }, 400);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getAssociatedAdvisors(bCategory: string) {
    this.businessService.getAssociatedAdvisors(bCategory).subscribe(
      data => {
        this.associatedAdvisors = data;
        this.showLoader = false;
        this.showLoader1 = false;
        this.profile = false;
        this.showTblAdvisor = false;
        this.showTblBusiness = false;
        this.showBusinessInfo = false;
        this.selectAdvisor = false;
        this.showAdvisorDetail = true;
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
  revealAdvisors() {
    $("#offcanvas-advisorInfo").show();
    $('#offcanvas-advisorInfo').css({ 'width': '81%', 'position': 'absolute' });
  }
  hideAdvisors() {
    $('#offcanvas-advisorInfo').css({ 'width': '0%' });
    setTimeout(() => {
      $("#offcanvas-advisorInfo").hide();
    }, 550);
  }
  revealInvest() {
    $("#offcanvas-invest").show();
    $('#offcanvas-invest').css({ 'width': '81%', 'position': 'absolute' });
  }
  hideInvest() {
    $('#offcanvas-invest').css({ 'width': '0%' });
    setTimeout(() => {
      $("#offcanvas-invest").hide();
    }, 550);
  }
  logout() {
    sessionStorage.removeItem('Id');
    this.router.navigateByUrl("/login");
  }
}
