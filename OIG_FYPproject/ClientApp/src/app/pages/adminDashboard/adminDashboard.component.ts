import { Component, OnInit } from '@angular/core';
import { GetRequestsService } from '../services/getRequests/getRequests.service';

@Component({
  selector: 'app-adminDashboard',
  templateUrl: './adminDashboard.component.html',
  styleUrls: ['./adminDashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private getRequests:GetRequestsService) { }

  ngOnInit() {
  }
  requests:any ={userName:"",userEmail:"",userPassword:"",userRole:"",requestStatus:""}
  getInvestorRequests(){
    this.requests = this.getRequests.getInvestorRequests().subscribe(
      data=>{
        this.requests = data;
      },
      (error) => {
        console.error(error);
      }
      );
  }
  getInvestors(){
    this.requests = this.getRequests.getInvestorRequests().subscribe(
      data=>{
        this.requests = data;
      },
      (error) => {
        console.error(error);
      }
      );
  }
}
