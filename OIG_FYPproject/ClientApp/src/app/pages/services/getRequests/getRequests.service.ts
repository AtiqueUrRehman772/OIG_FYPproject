import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetRequestsService {

constructor(private http: HttpClient) {}

getInvestorRequests() {
    return this.http.get("https://localhost:44302/api/Requests/getInvestorRequests");
  }
getAdvisorRequests() {
  return this.http.get("https://localhost:44302/api/Requests/getAdvisorRequests");
}
getOwnerRequests() {
  return this.http.get("https://localhost:44302/api/Requests/getOwnerRequests");
}
getRequestCount(){
  return this.http.get("https://localhost:44302/api/Requests/getRequestCount");
}
getAccCount(){
  return this.http.get("https://localhost:44302/api/Requests/getAccCount");
}
getDecCount(){
  return this.http.get("https://localhost:44302/api/Requests/getDecCount");
}
getAllRequests(){
  return this.http.get("https://localhost:44302/api/Requests/getAllRequests");
}
declineRequest(reqId:any){
  return this.http.post("https://localhost:44302/api/Requests/declineRequest",{userEmail:reqId});
}
acceptRequest(reqId:any){
  return this.http.post("https://localhost:44302/api/Requests/acceptRequest",{userEmail:reqId});
}
acceptHiringRequest(userEmail:any,reqId:any){
  return this.http.post("https://localhost:44302/api/Requests/acceptHiringRequest",{userEmail:userEmail,userName:reqId});
}
rejectHiringRequest(userEmail:any,reqId:any){
  return this.http.post("https://localhost:44302/api/Requests/rejectHiringRequest",{userEmail:userEmail,userName:reqId});
}
getHiringRequests(emailId:string){
  return this.http.post("https://localhost:44302/api/Requests/getHiringRequests",{userEmail:emailId});
}
getInvestmentRequests(emailId:string) {
  return this.http.post("https://localhost:44302/api/Requests/getInvestmentRequests",{userEmail:emailId});
}
getInvestmentRequestsHistory(emailId:string) {
  return this.http.post("https://localhost:44302/api/Requests/getInvestmentRequestsHistory",{userEmail:emailId});
}
acceptInvestmentRequest(emailId:string,bId:string,loginId:string) {
  return this.http.post("https://localhost:44302/api/Requests/acceptInvestmentRequest",{userEmail:emailId,userName:bId,userRole:loginId});
}
declineInvestmentRequest(emailId:string,bId:string,loginId:string) {
  return this.http.post("https://localhost:44302/api/Requests/declineInvestmentRequest",{userEmail:emailId,userName:bId,userRole:loginId});
}
getRequestsHistory(emailId:string){
  return this.http.post("https://localhost:44302/api/Requests/getRequestsHistory",{userEmail:emailId});
}
}

