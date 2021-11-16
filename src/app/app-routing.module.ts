import { ProfileComponent } from './pages/profile/profile.component';
import { AddMovieComponent } from './pages/add-movie/add-movie.component';
import { AnotherListComponent } from './pages/another-list/another-list.component';
import { MyListComponent } from './pages/my-list/my-list.component'
import { GuardService } from './services/guard.service'
import { HomeComponent } from './pages/home/home.component'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './pages/login/login.component'

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'my-list',
    component: MyListComponent,
    data: { requiresLogin: true },
    canActivate: [GuardService],
  },
  {
    path: 'my-list/add-movie',
    component: AddMovieComponent,
    data: { requiresLogin: true },
    canActivate: [GuardService],
  },
  {
    path: 'my-list/user',
    component: AnotherListComponent,
    data: { requiresLogin: true },
    canActivate: [GuardService],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: { requiresLogin: true },
    canActivate: [GuardService],
  },
  {
    path: '',
    component: HomeComponent,
    data: { requiresLogin: true },
    canActivate: [GuardService],
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
