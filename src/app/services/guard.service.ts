import { AuthService } from './auth.service'
import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class GuardService implements CanActivate {
  movies: any[] = []

  constructor(private service: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const requiresLogin = route.data['requiresLogin'] || false

    if (requiresLogin) {
      this.service.redirectIfNotAuthenticated()
    }

    return requiresLogin
  }
}
