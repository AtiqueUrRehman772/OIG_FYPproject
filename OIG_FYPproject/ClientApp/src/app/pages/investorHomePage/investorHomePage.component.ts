import { Component, OnInit } from '@angular/core';
import { BusinessService } from '../services/business/business.service';
import { GetAllUsersService } from '../services/getUsers/getAllUsers.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

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
  showBusinessInfo: boolean = false;
  businessInfo: any;
  selectAdvisor: boolean = false;
  advisors: any;
  advisor: any = { UName: "", Email: "", Firm: "", Rating: "" };
  business: any;
  profileDetails: any;
  skills: any;
  toggleEditable() {
    if (this.selectAdvisor)
      this.selectAdvisor = false;
    else
      this.selectAdvisor = true;
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
      this.showLoader = false;
    }, 750);
    //this.getAllAdvisors();
    //this.showTblAdvisor = false;
    this.getUserId();
    this.getProfile();
    this.getTime();
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
    this.showLoader1 = true;
    setTimeout(() => {
      this.showLoader1 = false;
    }, 400);
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
        this.showAdvisor();
        //console.warn(data);
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
    this.getAllUsers.getAllAdvisors().subscribe(
      data => {
        this.showAdvisor();
        //console.warn(data);
        this.advisors = data;
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
    this.profile = false;
    this.showTblAdvisor = false;
    this.showTblBusiness = false;
    this.showAdvisorDetail = true;
    this.advisor.UName = userName;
    this.advisor.Email = userEmail;
    this.advisor.Firm = firmName;
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
        alert('Your request is sent to the corresponding Advisor !');
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getBusinessInfo(Bid: string) {
    this.showLoader1 = true;
    setTimeout(() => {
      this.showLoader1 = false;
    }, 400);
    this.businessService.getBusinessInfo(Bid).subscribe(
      data => {
        this.businessInfo = data;
        this.showBusinessInfoDiv();
        console.log(this.businessInfo);
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
    //console.log(this.users.email);
    this.showLoader1 = true;
    setTimeout(() => {
      this.showLoader1 = false;
    }, 400);
    this.businessService.myDeals(this.users.email).subscribe(
      data => {
        //alert('Your request is sent to the corresponding Advisor !');
        //this.business = data;
        //console.warn(this.business);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  makeADeal(bid: string, bOwner: string) {
    //console.log('Yesssss');
    this.showLoader1 = true;
    setTimeout(() => {
      this.showLoader1 = false;
    }, 400);
    if (!this.selectAdvisor){
      this.dealInfo.value.advisorAttached = 'Not Selected';
    }
    this.businessService.makeADeal(this.users.email, bid, bOwner, this.dealInfo.value.amount, this.dealInfo.value.advisorAttached).subscribe(
      data => {
        alert('Request sent to the Advisor');
      },
      (error) => {
        console.error(error);
      }
    );
  }

  logout() {
    sessionStorage.removeItem('Id');
    this.router.navigateByUrl("/login");
  }
}
