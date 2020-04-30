import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';

import {Subscription} from 'rxjs';
import {switchMap} from 'rxjs/operators';

import {PostsService} from '../../../shared/services/posts.service';
import {Post} from '../../../shared/interfaces';


@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

    form: FormGroup;
    post: Post;
    submitting = false;
    updateSub: Subscription;

    constructor(private route: ActivatedRoute, private postsService: PostsService) { }

    ngOnInit(): void {
        this.route.params.pipe(
            switchMap((params: Params) => {
                return this.postsService.getById(params['id'])
            })
        ).subscribe((post: Post) => {
            this.post = post;

            this.form = new FormGroup({
                title: new FormControl(post.title),
                text: new FormControl(post.text)
            })
        })
    }

    ngOnDestroy() {
        if (this.updateSub) {
            this.updateSub.unsubscribe()
        }
    }

    submit() {
        if (this.form.invalid) {
            return
        }

        this.submitting = true;

        this.updateSub = this.postsService.update({
            ...this.post,
            text: this.form.value.text,
            title: this.form.value.title
        }).subscribe((post) => {
            this.submitting = false
        })
    }

}
