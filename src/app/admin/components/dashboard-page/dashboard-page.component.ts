import {Component, OnDestroy, OnInit} from '@angular/core';

import {Subscription} from 'rxjs';

import {PostsService} from '../../../shared/services/posts.service';
import {Post} from '../../../shared/interfaces';
import {AlertService} from '../../alert.service';


@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

    searchStr = '';
    posts: Post[] = [];
    pSub: Subscription;
    delSub: Subscription;

    constructor(private postsService: PostsService, private alert: AlertService) { }

    ngOnInit(): void {
        this.pSub = this.postsService.getAll().subscribe(posts => {
            this.posts = posts
        })
    }

    ngOnDestroy(): void {
        if (this.pSub) {
            this.pSub.unsubscribe()
        }

        if (this.delSub) {
            this.delSub.unsubscribe()
        }
    }

    remove(id: string) {
        this.delSub = this.postsService.remove(id).subscribe(() => {
            this.posts = this.posts.filter(post => post.id !== id);
            this.alert.warning('Post deleted')
        })
    }

}
