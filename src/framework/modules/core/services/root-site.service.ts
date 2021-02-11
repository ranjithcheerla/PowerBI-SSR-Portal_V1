import { Injectable } from '@angular/core';
import { IRootSite } from '../models/rootsite.model';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RootSiteService implements IRootSite {
  constructor() {}

  getSiteId() {
    return of('__NONE__');
  }
}
