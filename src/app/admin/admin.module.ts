import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { DashboardPageComponent } from './components/dashboard-page/dashboard-page.component';
import { CreatePageComponent } from './components/create-page/create-page.component';
import { EditPageComponent } from './components/edit-page/edit-page.component';

import {SharedModule} from '../shared/shared.module';
import {AuthGuard} from '../shared/services/auth.guard';
import {SearchPipe} from '../shared/search.pipe';


@NgModule({
    declarations: [
        AdminLayoutComponent,
        LoginPageComponent,
        DashboardPageComponent,
        CreatePageComponent,
        EditPageComponent,
        SearchPipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule.forChild([
            {path: '', component: AdminLayoutComponent, children: [
                {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
                {path: 'login', component: LoginPageComponent},
                {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]},
                {path: 'create', component: CreatePageComponent, canActivate: [AuthGuard]},
                {path: 'post/:id/edit', component: EditPageComponent, canActivate: [AuthGuard]}
            ]}
        ])
    ],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AdminModule {}
