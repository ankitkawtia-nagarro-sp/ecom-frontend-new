import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginPayload } from 'src/app/models/login-payload';
import { RegisterPayload } from 'src/app/models/register-payload';
import { SearchQueryDto } from 'src/app/models/search-query-dto';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProductService } from 'src/app/services/product.service';
import { SearchSharedService } from 'src/app/services/search-shared-service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userAccount: string;
  isShowLogin = true;
  isShowRegister = false;
  registerForm: FormGroup;
  registerPayload: RegisterPayload;
  loginPayload: LoginPayload;
  isError: boolean;
  errorMessage: String;
  isSuccess = false;
  successMessage: String;
  searchQueryDto: SearchQueryDto;

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService,
              private productService: ProductService, private searchSharedService:SearchSharedService,
              private router: Router) {
    console.log("Constructor HEader");
    this.setUserName();
    this.registerPayload = {
      email: '',
      password: '',
      mobileNumber: '',
      gender: ''
    };
    this.loginPayload = {
      'username': '',
      'password': ''
    }
    this.searchQueryDto = {
      "textQuery": '',
      "filters": []
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      name: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  private setUserName() {
    console.log("HEader set username")
    console.log("USername:" + this.authenticationService.getUserName());
    if (this.authenticationService.getUserName() != null) {
      this.userAccount = this.authenticationService.getUserName();
      this.isShowLogin = false;
    } else {
      this.isShowLogin = true;
    }
    console.log("isShowLogin:"+this.isShowLogin);
  }

  register() {
    console.log('Register Payload:' + JSON.stringify(this.registerPayload));
    this.authenticationService.register(this.registerPayload).toPromise().then((result) => {
      console.log("Result:" + JSON.stringify(result));
      if (result.status === 201) {

        this.isSuccess = true;
        this.successMessage = result.message;
        this.isError = false;
        //this.router.navigateByUrl('/login');
        this.isShowLogin = true;
        this.isShowRegister = false;
      } else {
        this.isError = true;
        this.errorMessage = result.message;
      }
    }, (result) => {
      console.log("Error Res:" + JSON.stringify(result.error));
      this.isError = true;
      this.errorMessage = result.error.message;

    })
  }

  login() {
    console.log('Login Payload:' + JSON.stringify(this.loginPayload));
    this.authenticationService.login(this.loginPayload).toPromise().then((result) => {
      if (result) {
        this.isError = false;
        this.setUserName();
        this.router.navigateByUrl('/');
        this.isShowLogin = false;
      } else {
        this.isError = true;
      }
    }, (result) => {
      console.log("Login Error:" + JSON.stringify(result.error));
      this.isError = true;
      this.errorMessage = result.error.message;
    })
  }

  toggleDisplayLogin() {
    this.isShowLogin = true;
    this.isShowRegister = false;
  }
  toggleDisplayRegister() {
    this.isShowRegister = true;
    this.isShowLogin = false;
  }

  search() {
    this.productService.search(this.searchQueryDto).toPromise().then(res => {
      console.log(res);
      this.searchSharedService.sendSearchData(res);
      this.router.navigate(["/search/"+this.searchQueryDto.textQuery]);
    });
  }
}
