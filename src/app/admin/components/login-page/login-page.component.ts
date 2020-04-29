import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {User} from '../../../shared/interfaces';
import {AuthService} from '../../../shared/services/auth.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

    form: FormGroup;
    submitted = false;
    needLoginMsg: string;

    constructor(
        public authService: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.route.queryParams.subscribe((params: Params) => {
            if (params['needLogin']) {
                this.needLoginMsg = 'Please, sign in again'
            } else if (params['authFailed']) {
                this.needLoginMsg = 'Session expired, log in again'
            }
        });

        this.form = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.email
            ]),
            password: new FormControl(null, [
                Validators.required,
                Validators.minLength(6)
            ])
        });
    }

    submit() {
        if (this.form.invalid) {
            return;
        }

        this.submitted = true;

        const user: User = {
            email: this.form.value.email,
            password: this.form.value.password
        };

        this.authService.login(user).subscribe(() => {
            this.form.reset();
            this.router.navigate(['/admin', 'dashboard']);
            this.submitted = false
        }, () => {
            this.submitted = false
        })
    }

}
