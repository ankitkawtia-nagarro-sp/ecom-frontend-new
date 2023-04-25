import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterPayload } from '../models/register-payload';
import { HttpClient } from '@angular/common/http';
import { RegisterApiResponse } from '../models/response/register-api-response';
import { map } from 'rxjs/operators';
import { AUTH_API_CONSTANTS, AUTH_SERVER_CONSTANTS} from '../constants/auth.constants';
import { LoginPayload } from '../models/login-payload';
import { AuthResponsePayload } from '../models/response/authentication-response.payload';
import { LocalStorageService } from 'ngx-webstorage';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private $localStorage:LocalStorageService) { }

  register(registerPayload: RegisterPayload): Observable<RegisterApiResponse> {
    //const registerURL = `${AUTH_SERVER_CONSTANTS.baseURL}/${AUTH_API_CONSTANTS.register}`;
    return this.http.post<RegisterApiResponse>(environment.registerURL, registerPayload).pipe(map(data => {
      console.log("Data:" + JSON.stringify(data));
      return data;
    }));
  }

  login(loginPayload: LoginPayload): Observable<boolean> {
    //const loginUrl = `${AUTH_SERVER_CONSTANTS.baseURL}/${AUTH_API_CONSTANTS.login}`;
    return this.http.post<AuthResponsePayload>(environment.loginUrl, loginPayload).pipe(map(data => {
      console.log("Token data:" + JSON.stringify(data));
      this.$localStorage.store('authenticationToken', data.accessToken);
      this.$localStorage.store('user', data.username);
      return true;
    }));
  }

  logout() {
    //const logoutURl = `${AUTH_SERVER_CONSTANTS.baseURL}/${AUTH_API_CONSTANTS.logout}`;
    const message = this.http.post<String>(environment.logoutUrl,null).pipe(map(data => {
      console.log("Logout data:" + JSON.stringify(data));
      return true;
    }));
    console.log("Logout MEssage:"+JSON.stringify(message));
    this.$localStorage.clear('authenticationToken');
    this.$localStorage.clear('user');
  }
  
  getUserName(): string{
    return this.$localStorage.retrieve('user');
  }
}
