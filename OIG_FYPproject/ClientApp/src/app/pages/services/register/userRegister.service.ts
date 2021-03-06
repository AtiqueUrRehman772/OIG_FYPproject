import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class UserRegisterService {
  constructor(private http: HttpClient) {}

  registerUser(userName:string,email:string,password:string,userType:string,country:string) {
    return this.http.post("https://localhost:44302/api/User/register", { userName: userName ,email : email ,password:password,role: userType,country: country})
  }
}
