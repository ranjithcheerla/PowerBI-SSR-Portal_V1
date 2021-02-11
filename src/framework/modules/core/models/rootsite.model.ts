import { Observable } from 'rxjs';

export interface IRootSite {
  /**
   * @param - None
   * @returns `Observable<string>`, return `of('__NONE__')` if you wish load the default site
   */
  getSiteId(): Observable<string>;
}
