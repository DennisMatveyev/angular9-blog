import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {firebaseCreatePostResponse, Post} from '../interfaces';
import {environment} from '../../../environments/environment';


@Injectable({providedIn: 'root'})
export class PostsService {

    constructor(private http: HttpClient) {}

    create(post: Post): Observable<Post> {
        return this.http.post(`${environment.firebaseDbUrl}/posts.json`, post)
            .pipe(
                map((response: firebaseCreatePostResponse) => {
                    return {
                        ...post,
                        id: response.name,
                        date: new Date(post.date)
                    }
                })
            )
    }

    getAll(): Observable<Post[]>{
        return this.http.get(`${environment.firebaseDbUrl}/posts.json`)
            .pipe(
                map((response) => {
                    return Object.keys(response).map((key) => ({
                        ...response[key],
                        id: key,
                        date: new Date(response[key].date)
                    }))
                })
            )
    }

}
