import { Component, OnInit } from '@angular/core';
import { GetAllUsersService } from '../services/getUsers/getAllUsers.service';
import { Router } from '@angular/router';
import { GetRequestsService } from '../services/getRequests/getRequests.service';
import { BusinessService } from '../services/business/business.service';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

declare const $: any;

@Component({
  selector: 'app-advisorHomePage',
  templateUrl: './advisorHomePage.component.html',
  styleUrls: ['./advisorHomePage.component.css']
})
export class AdvisorHomePageComponent implements OnInit {

  constructor(private getAllUsers: GetAllUsersService, private getRequests: GetRequestsService, private businessService: BusinessService, private router: Router) { }

  /////////// --------   Variables  -------- ///////////
  bCat = new FormGroup({
    category: new FormControl("")
  });
  userEdit: any = {
    userName: '',
    contact: '',
    firmName: '',
    skills: '',
    description: '',
    skillList: ''
  };
  categories: any = ["Food", "Property", "Vehicles"];
  dataxyz: any;
  riskPercentage: any;
  users: any;
  risk: any;
  business: any;
  advisorBusiness: any;
  profileDetails: any;
  skills: any;
  time: any;
  businessInfo:any;
  viewAllBusiness:boolean = false;
  toggleCat: boolean = false;
  toggleListArrow: boolean = false;
  hiringRequests: any;
  history: boolean = false;
  profile: boolean = false;
  profileEdit: boolean = false;
  showLoader: boolean = true;
  showLoader1: boolean = false;
  tblHiringRequests: boolean = false;
  tblBusiness: boolean = false;
  ngOnInit() {
    if (sessionStorage.getItem('Id') == null) {
      this.router.navigateByUrl("/login");
    }
    this.getBusinessInfo('1');
    setTimeout(() => {
      this.hideBusinessInfo();
    }, 100);
    $("#offcanvas-SkillCanvas").hide();
    $("#ghost").hide();
    setTimeout(() => {
      this.showLoader = false;
      this.getAdvisorBusiness();
    }, 750);
    this.getProfile();
    this.getUserId();
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
  showProfile() {
    this.getProfile();
    this.profile = true;
  }
  hideProfile() {
    this.profile = false;
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
  getAllBusiness() {
    this.showLoader1 = true;
    setTimeout(() => {
      this.showLoader1 = false;
    }, 400);
    setTimeout(() => {
      this.viewAllBusiness = false;
    }, 100);
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
  showBusiness() {
    this.showLoader1 = true;
    setTimeout(() => {
      this.showLoader1 = false;
    }, 400);
    this.tblBusiness = true;
    this.profile = false;
    this.tblHiringRequests = false;
  }
  hideHiringRequests() {
    this.tblHiringRequests = false;
  }
  getHiringRequests() {
    this.getRequests.getHiringRequests(this.users.email).subscribe(
      data => {
        //console.warn(data);
        this.tblHiringRequests = true;
        this.history = false;
        this.hiringRequests = data;
        console.log(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getRequestsHistory() {
    this.getRequests.getRequestsHistory(this.users.email).subscribe(
      data => {
        this.tblHiringRequests = true;
        this.history = true;
        this.hiringRequests = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  hideBusiness() {
    this.viewAllBusiness = false;
    this.tblBusiness = false;
  }
  getAdvisorBusiness() {
    this.showLoader1 = true;
    setTimeout(() => {
      this.showLoader1 = false;
    }, 400);
    setTimeout(() => {
      this.viewAllBusiness = true;
    }, 100);
    this.businessService.getAdvisorBusiness(this.users.email).subscribe(
      data => {
        //this.showBusiness();
        this.business = data;
        //console.warn(this.business);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  rateRisk(bId: string) {
    this.showLoader1 = true;
    setTimeout(() => {
      this.showLoader1 = false;
    }, 400);
    this.businessService.rateRisk(bId, this.risk).subscribe(
      data => {
        this.getAdvisorBusiness();
        alert('Rated Successfully !!');
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
    this.getAllUsers.getAdvisorProfile().subscribe(
      data => {
        console.warn(data);
        this.profileDetails = data;
        this.userEdit.skillList = this.profileDetails.role;
        this.skills = this.profileDetails.skills.split(",");
        //console.warn(this.skills);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  editProfile() {
    this.userEdit.userName = this.profileDetails.userName;
    this.userEdit.contact = this.profileDetails.contact;
    this.userEdit.firmName = this.profileDetails.firmName;
    this.userEdit.skills = this.profileDetails.skills;
    this.userEdit.description = this.profileDetails.description;
    //console.log(this.userEdit);
    this.profileEdit = true;
  }
  showProgressSummary() {
    this.profileEdit = false;
  }
  updateProfileChanges(form: any) {
    //console.log(form.value);
    console.log(this.userEdit.skillList );
    this.getAllUsers.editProfile(this.users.email, this.userEdit.userName, this.userEdit.contact, this.userEdit.firmName,
      this.userEdit.skills, this.userEdit.description,this.userEdit.skillList).subscribe(
        data => {
          this.getProfile();
          Swal.fire(
            'Saved !',
            'Profile has been Updated !',
            'success'
          );
        },
        (error) => {
          console.error(error);
        }
      );
  }
  acceptHiringRequest(reqEmail: string) {
    this.getRequests.acceptHiringRequest(this.users.email, reqEmail).subscribe(
      data => {
        //console.warn(data);
        this.tblHiringRequests = true;
        this.getHiringRequests();
        if (data) {
          Swal.fire(
            'Approved !',
            'Request has been Approved !',
            'success'
          )
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
  rejectHiringRequest(reqEmail: string) {
    this.getRequests.rejectHiringRequest(this.users.email, reqEmail).subscribe(
      data => {
        //console.warn(data);
        this.tblHiringRequests = true;
        this.getHiringRequests();
        if (data) {
          Swal.fire(
            'Rejected !',
            'Request has been Rejected !',
            'success'
          )
        }
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
  revealSkillCanvas() {
    $("#offcanvas-SkillCanvas").show();
    $("#ghost").show();
    $('#offcanvas-SkillCanvas').css({ 'width': '81%', 'position': 'absolute' });
    $('#sidebar').css({ 'opacity': '0.15', 'background-color': 'black' });
    $('#ghost').css({ 'height': '165vh' });
  }
  getBusinessInfo(Bid: string) {
    this.showLoader1 = true;
    setTimeout(() => {
      this.showLoader1 = false;
    }, 400);
    this.businessService.getBusinessInfo(Bid).subscribe(
      data => {
        this.businessInfo = data;
        this.revealBusinessInfo();
        //console.log(this.businessInfo);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  hideSkillCanvas() {
    $("#ghost").hide();
    $('#sidebar').css({ 'background-color': 'white', 'opacity': '1' });
    $('#offcanvas-SkillCanvas').css({ 'width': '0%' });
    setTimeout(() => {
      $("#offcanvas-SkillCanvas").hide();
    }, 500);
  }
  revealBusinessInfo() {
    $("#offcanvas-businessInfo").show();
    $("#ghost").show();
    $('#offcanvas-businessInfo').css({ 'width': '81%', 'position': 'absolute' });
    $('#sidebar').css({ 'opacity': '0.15', 'background-color': 'black' });
    $('#ghost').css({ 'height': '100vh' });
  }
  hideBusinessInfo() {
    $("#ghost").hide();
    $('#sidebar').css({ 'background-color': 'white', 'opacity': '1' });
    $('#offcanvas-businessInfo').css({ 'width': '0%' });
    setTimeout(() => {
      $("#offcanvas-businessInfo").hide();
    }, 500);
  }
  alertSave(){
    Swal.fire(
      'Saved !',
      'New Skill Set saved !',
      'success'
    )
    this.hideSkillCanvas();
  }
  checkSkillList(id:any,cat:any) {
      if(!this.userEdit.skills.includes(cat)){
        this.userEdit.skills = this.userEdit.skills + ',' + cat;
      }
        if(this.userEdit.skillList.includes(id)){
          this.userEdit.skillList = this.userEdit.skillList.replace(id,'');
        }
        else {
        this.userEdit.skillList = this.userEdit.skillList + ',' + id;
      }
      console.log(this.userEdit.skills);
  }
  expandSubcategory(type: any) {
    console.log(this.business);
    if (this.toggleCat) {
      this.toggleCat = false;
      $("#" + type).css({ 'height': '0px' });
    }
    else {
      this.toggleCat = true;
      $("#" + type).css({ 'height': '120px' });
    }
  }
  logout() {
    sessionStorage.setItem('Id', "true");
    this.router.navigateByUrl("/login");
  }
}
