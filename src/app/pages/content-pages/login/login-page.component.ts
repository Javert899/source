import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { environment } from '../../../../environments/environment';
import {Pm4pyService} from "../../../pm4py-service.service";

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent {
    username : string;
    password : string;

    public loginTextHint : string;


    @ViewChild('f') loginForm: NgForm;

    constructor(private router: Router,
        private route: ActivatedRoute, private pm4pyServ: Pm4pyService) {

        this.username = "";
        this.password = "";

        this.loginTextHint = environment.loginTextHint;
    }

    // On submit button click    
    onSubmit() {
        this.username = (<HTMLInputElement>document.getElementById("username0")).value;
        this.password = (<HTMLInputElement>document.getElementById("password0")).value;

        this.pm4pyServ.loginService(this.username, this.password).subscribe(data => {
            let resultJson : JSON = data as JSON;
            console.log(resultJson);

            if (resultJson["status"] == "OK") {
                localStorage.setItem("sessionId", resultJson["sessionId"]);
                localStorage.removeItem("filtersPerProcess");
                this.router.navigateByUrl('/real-ws/plist');
            }
            else {
                alert("Login failed! Try again");
            }
        });
    }

    keyDownFunction(event) {
        if(event.keyCode == 13) {
            this.onSubmit();
            // rest of your code
        }
    }
}
