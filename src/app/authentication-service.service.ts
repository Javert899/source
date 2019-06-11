import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/map';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationServiceService {
    authenticated: boolean;
    sessionId: string;
    userId: string;
    isNotLogin: boolean;
    enableUpload: boolean;
    enableDownload: boolean;

    webservicePath: string;

    constructor(private http: HttpClient, private router: Router) {
        this.webservicePath = environment.webServicePath;

        this.resetAuthentication();
    }

    doLogout() {
        this.resetAuthentication();
        localStorage.removeItem("process");
        this.router.navigateByUrl("/pages/login");
    }

    resetAuthentication() {
        localStorage.removeItem("sessionId");
        this.authenticated = false;
        this.sessionId = '';
        this.userId = '';
        this.isNotLogin = false;
        this.enableUpload = false;
        this.enableDownload = false;
    }

    getAllAuthenticationParameters() {
        return {
            'authenticated': this.authenticated,
            'sessionId': this.sessionId,
            'userId': this.userId,
            'isNotLogin': this.isNotLogin,
            'enableUpload': this.enableUpload,
            'enableDownload': this.enableDownload
        }
    }

    checkAuthentication0() {
        let parameters : HttpParams = new HttpParams();

        let process = localStorage.getItem("process");
        let sessionId = localStorage.getItem("sessionId");

        parameters = parameters.set("process", process);
        parameters = parameters.set("session", sessionId);

        var completeUrl : string = this.webservicePath + "checkSessionService";

        return this.http.get(completeUrl, {params: parameters});
    }

    checkAuthentication() {
        return this.checkAuthentication0().map(data => {
            let sessionJson : JSON = data as JSON;

            if ("status" in sessionJson && sessionJson["status"] == "OK") {
                if ("user" in sessionJson) {
                    this.userId = sessionJson["user"];
                }
                this.isNotLogin = true;
                this.authenticated = true;
            }
            else {
                this.authenticated = false;
                this.sessionId = "";
                this.userId = "";
                this.isNotLogin = false;
            }

            if ("can_upload" in sessionJson) {
                this.enableUpload = environment.enableUpload && sessionJson["can_upload"] && this.isNotLogin;
            }
            else {
                this.enableUpload = false;
            }

            if ("can_download" in sessionJson) {
                this.enableDownload = environment.enableDownload && sessionJson["can_download"] && this.isNotLogin;
            }
            else {
                this.enableDownload = false;
            }

            if (this.authenticated == false && environment.enableLogin) {
                console.log("not authenticated");
                this.router.navigateByUrl("/pages/login");
            }
            else {
                let processInLocalStorage = localStorage.getItem("process");
                if (processInLocalStorage == null) {
                    console.log("process in local storage is empty!");
                    this.router.navigateByUrl("/real-ws/plist");
                }
            }

            return this.getAllAuthenticationParameters();
        });
    }
}
