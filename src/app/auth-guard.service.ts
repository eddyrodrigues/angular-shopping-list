import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
  UrlSegmentGroup,
  UrlTree,
} from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

// @Injectable({ providedIn: 'root' })
// export class AuthGuardService {
//   constructor(private authService: AuthService, private router: Router) {}

// }

export const canActive: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): MaybeAsync<GuardResult> => {
  let authService = inject(AuthService);
  let router = inject(Router);
  console.log(authService);
  if (authService.isLogged) {
    return true;
  } else {
    console.log('1');
    router.navigate(['/logout']);
    console.log('2');
    const tree: UrlTree = new Router().parseUrl('/logout');
    console.log('3');
    return tree;
  }
};
