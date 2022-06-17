import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetAllUsersService {

  constructor(private http: HttpClient) { }
  getAllUsers() {
    return this.http.get("https://localhost:44302/api/User/getAllUsers");
  }
  getUserCount() {
    return this.http.get("https://localhost:44302/api/User/getUserCount");
  }
  getTime() {
    return this.http.get("https://localhost:44302/api/User/getTime");
  }
  getUserId() {
    return this.http.get("https://localhost:44302/api/User/getUserId");
  }
  getProfile() {
    return this.http.get("https://localhost:44302/api/User/getInvestorProfile");
  }
  getAdvisorProfile() {
    return this.http.get("https://localhost:44302/api/User/getProfile");
  }
  getAdvisorInfo(email:string){
    return this.http.post("https://localhost:44302/api/User/getAdvisorInfo",{email:email});
  }
  editProfile(advisorId:string,userName:string,contact:string,firmName:string,skills:string,description:string,skillList:string) {
    return this.http.post("https://localhost:44302/api/User/editProfile",{email:advisorId,userName:userName,contact:contact,firmName:firmName,skills:skills,description:description,role:skillList});
  }
  revealInvestors(bId:string) {
    return this.http.post("https://localhost:44302/api/User/revealInvestors",{email:bId});
  }
  getAllAdvisors() {
    return this.http.get("https://localhost:44302/api/User/getAllAdvisors");
  }
  getMyAdvisors() {
    return this.http.get("https://localhost:44302/api/User/getMyAdvisors");
  }

  ////////////   --------    CRUD User Operations   --------   ////////////
  deleteUser(reqId:any) {
    return this.http.post("https://localhost:44302/api/User/deleteUser",{email:reqId});
  }
  editUserDetails(userName:any,userEmail:any,password:any){
    return this.http.post("https://localhost:44302/api/User/editUserDetails",{userName:userName,email:userEmail,password:password});
  }
}
