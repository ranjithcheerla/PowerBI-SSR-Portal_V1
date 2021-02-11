import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AppService } from '../services/app.service';
import { filter, mapTo, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlatformreadyGuard implements CanActivate, CanLoad {
  constructor(private appService: AppService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.appService.routeParams$.next(next.params);
    return this.isPlatormReady();
  }
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    this.appService.routeParams$.next({ path: route.path });
    return this.isPlatormReady();
  }

  isPlatormReady(): Observable<boolean> {
    return this.appService.platformReady$.asObservable().pipe(
      filter((isReady: boolean) => isReady),
      take(1),
      mapTo(true)
    );
  }
}
