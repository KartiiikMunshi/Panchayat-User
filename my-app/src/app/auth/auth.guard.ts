import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
   providedIn: 'root'
})

export class AuthGuard implements CanActivate {

   constructor(private authService: AuthService, private router: Router) { }

   canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean | UrlTree {
      let url: string = state.url;
      return this.checkLogin({ url });
   }

   checkLogin({ url }: { url: any; }): true | UrlTree {
      console.log("Url: " + url)
      let val: any = localStorage.getItem('isUserLoggedIn');

      if (val != null && val == "true") {
         if (url == "/login")
            this.router.parseUrl('/Dashboard');
         else
            return true;
      }
      else {
         return this.router.parseUrl('/login');
      }
      return this.router.parseUrl('/login');
   }

}
