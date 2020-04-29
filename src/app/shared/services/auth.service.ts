import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {Observable, Subject, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

import {FirebaseAuthResponse, User} from '../interfaces';
import {environment} from '../../../environments/environment';


const AUTH_SIGN_IN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`;


@Injectable({providedIn: 'root'})
export class AuthService {
    public error$: Subject<string> = new Subject<string>();

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
                tap(this.setToken),
                catchError(this.handleError.bind(this))
            )
    }

    logout() {
        this.setToken(null)
    }

    isAuthenticated(): boolean {
        return !!this.token
    }

    private handleError(error: HttpErrorResponse) {
        const {message} = error.error.error;

        switch (message) {
            case 'INVALID_EMAIL':
                this.error$.next('Invalid email');
                break;
            case 'INVALID_PASSWORD':
                this.error$.next('Invalid password');
                break;
            case 'EMAIL_NOT_FOUND':
                this.error$.next('Email not found');
                break;
        }

        return throwError(error)
    }
}
