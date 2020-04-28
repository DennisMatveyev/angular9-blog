import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {User} from '../interfaces';


@Injectable()
export class AuthService {
    constructor(private http: HttpClient) {}

    get token(): string {
        return ''
    }

    private setToken() {

    }

    login(user: User): Observable<any> {
        return this.http.post('', user)
    }

    logout() {

    }

    isAuthenticated(): boolean {
        return !!this.token
    }
}
