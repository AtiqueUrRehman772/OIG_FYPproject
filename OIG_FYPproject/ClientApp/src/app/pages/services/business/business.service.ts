import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(private http:HttpClient) { }

  addNewBusiness(bName: string, bOwner: string,bCategory:string,bCountry:string,bCity:string,bAddress:string,email:string) {
    return this.http.post("https://localhost:44302/api/Business/addNewBusiness", { bName: bName, bOwner: bOwner, bCategory: bCategory,bId:bCountry,registeredOn:bCity,riskFactor:bAddress,address:email});
  }
  getAllBusiness() {
    return this.http.get("https://localhost:44302/api/Business/getAvailableBusiness");
  }
  getAdvisorBusiness(email:string) {
    return this.http.post("https://localhost:44302/api/Business/getAdvisorBusiness",{bCategory: email});
  }
  getBusiness(bCat:string) {
    return this.http.post("https://localhost:44302/api/Business/getBusiness",{ bCategory: bCat});
  }
  getMyBusinesses(email:string){
    return this.http.post("https://localhost:44302/api/Business/getMyBusinesses",{bName:email});
  }
  getClosedBusiness(email:string){
    return this.http.post("https://localhost:44302/api/Business/getClosedBusiness",{bName:email});
  }
  markComplete(bid:string){
    return this.http.post("https://localhost:44302/api/Business/markComplete",{bName:bid});
  }
  hireAdvisor(email:string,loginId){
    return this.http.post("https://localhost:44302/api/Business/hireAdvisor",{bName:email,bOwner:loginId});
  }
  myDeals(email:string){
    return this.http.post("https://localhost:44302/api/Business/myDeals",{bName:email});
  }
  makeADeal(email:string,bid:string,bOwner:string,amount:string,advisorAttached:string){
    console.log(advisorAttached);
    return this.http.post("https://localhost:44302/api/Business/makeADeal  ",{bName:email,bId:bid,bOwner:bOwner,investedAmount:amount,progress:advisorAttached});
  }
  getBusinessInfo(Bid:string){
    return this.http.post("https://localhost:44302/api/Business/getBusinessInfo",{bName:Bid});
  }
  rateRisk(Bid:string,risk:string){
    return this.http.post("https://localhost:44302/api/Business/rateRisk",{bId:Bid,progress:risk});
  }
  getFilteredBusiness(riskPercentage:string,category:string) {
    return this.http.post("https://localhost:44302/api/Business/getFilteredBusiness",{ progress: riskPercentage,bCategory: category});
  }
  getAssociatedAdvisors(category:string) {
    return this.http.post("https://localhost:44302/api/Business/getAssociatedAdvisors",{bCategory: category});
  }
}
