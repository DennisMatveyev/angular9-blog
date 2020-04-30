import {Component, OnDestroy, OnInit} from '@angular/core';

import {Subscription} from 'rxjs';

import {PostsService} from '../../../shared/services/posts.service';
import {Post} from '../../../shared/interfaces';


@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

    searchStr = '';
    posts: Post[] = [];
    pSub: Subscription;

    constructor(private postsService: PostsService) { }

    ngOnInit(): void {
        this.pSub = this.postsService.getAll().subscribe(posts => {
            this.posts = posts
        })
    }

    ngOnDestroy(): void {
        if (this.pSub) {
            this.pSub.unsubscribe()
        }
    }

    remove(id: string) {

    }

}
