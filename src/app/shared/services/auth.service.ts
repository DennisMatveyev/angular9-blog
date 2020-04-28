import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

import {FirebaseAuthResponse, User} from '../interfaces';
import {environment} from '../../../environments/environment';


const AUTH_SIGN_IN_URL = `
https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}
`;


@Injectable()
export class AuthService {
    constructor(private http: HttpClient) {}

    get token(): string {
        const expDate = new Date(localStorage.getItem('firebase-token-exp'));

        if (new Date() > expDate) {
            this.logout();
            return null
        }

        return localStorage.getItem('firebase-token')
    }

    // RESPONSE we get in login pipe tap
    private setToken(response: FirebaseAuthResponse | null) {
        if (response) {
            const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);

            localStorage.setItem('firebase-token', response.idToken);
            localStorage.setItem('firebase-token-exp', expDate.toString())

        } else {
            localStorage.clear()
        }

    }

    login(user: User): Observable<any> {
        user.returnSecureToken = true;

        return this.http.post(AUTH_SIGN_IN_URL, user)
            .pipe(
                tap(this.setToken)
            )
    }

    logout() {
        this.setToken(null)
    }

    isAuthenticated(): boolean {
        return !!this.token
    }
}
