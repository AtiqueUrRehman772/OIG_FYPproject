import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetRequestsService {

constructor(private http: HttpClient) {}

getInvestorRequests() {
    return this.http.get("https://localhost:44325/api/Requests/getInvestorRequests");
  }
}
