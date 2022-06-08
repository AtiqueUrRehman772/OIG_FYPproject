import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetInvestorsService {

  constructor(private http: HttpClient) {}

  getInvestors() {
      return this.http.get("https://localhost:44302/api/User/getInvestors");
    }
  getAdvisors() {
      return this.http.get("https://localhost:44302/api/User/getAdvisors");
    }
}
