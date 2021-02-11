import { combineLatest, Subject, Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { _ } from './../../../lodash';
import { FrameworkService } from './../../core/services/framework.service';
import { takeUntil } from 'rxjs/operators';

// This class is extended by LayoutComponent, WidgetStoreComponent and
// You need to extend this class in every parent component of lazy loaded module.
export class FWRoot {
  destroy$ = new Subject<boolean>();
  constructor(
    public route: ActivatedRoute,
    public fwService: FrameworkService
  ) {
    let params: Observable<Params>[] = [];
    // This will read the routes till the root of the activated route.
    params = this.getRouteParamsTillRoot(params, this.route);
    // Get the query params for the activated route since this type will be avilable only for the current route.
    params.push(this.route.queryParams);

    combineLatest(params)
      .pipe(takeUntil(this.destroy$))
      .subscribe((rparams: { [key: string]: string | number }[]) => {
        let combineParams = {};
        _.each(rparams, (param: { [key: string]: string | number }) => {
          combineParams = _.merge({}, combineParams, param);
        });

        this.fwService.apiSetAppData('routeParams', combineParams);
        this.fwService.__setleftNavRoute(combineParams);
        this.fwService.__setWidgetStoreRoute(combineParams);
      });
  }

  private getRouteParamsTillRoot(
    routeParams: Observable<Params>[] = [],
    route: ActivatedRoute
  ) {
    if (route.params) {
      routeParams.push(route.params);
    }
    if (route.parent) {
      this.getRouteParamsTillRoot(routeParams, route.parent);
    }
    return routeParams;
  }

  destroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
