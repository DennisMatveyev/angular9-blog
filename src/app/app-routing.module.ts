import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {MainLayoutComponent} from './components/main-layout/main-layout.component';
import {HomePageComponent} from './components/home-page/home-page.component';
import {PostPageComponent} from './components/post-page/post-page.component';
import {AdminModule} from './admin/admin.module';


const routes: Routes = [
    {path: '', component: MainLayoutComponent, children: [
        {path: '', redirectTo: '/', pathMatch: 'full'},
        {path: '', component: HomePageComponent},
        {path: 'post/:id', component: PostPageComponent}
    ]},
    {path: 'admin', loadChildren: () => AdminModule}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
