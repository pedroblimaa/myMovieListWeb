import { MyListComponent } from './pages/my-list/my-list.component'
import { GuardService } from './services/guard.service'
import { HomeComponent } from './pages/home/home.component'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './pages/Login/Login.component'

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'my-list',
    component: MyListComponent,
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
