import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  userAccount:string;
  constructor(private authenticationService:AuthenticationService, private router:Router) { }

  ngOnInit() {
    this.setUserName();
  }

  private setUserName() {
    if (this.authenticationService.getUserName() != null)
      this.userAccount = this.authenticationService.getUserName();
    else 
      this.userAccount = "User";
    
  }

  logout(){
    this.authenticationService.logout();
    //this.router.navigateByUrl("/");
  }
}
