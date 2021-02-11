import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Store } from './../types/store.type';
import { WindowToken } from './window.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(@Inject(WindowToken) private window: any) {}
  set(key: string, data: any, store: Store = 'local'): Observable<string> {
    try {
      const ref = store === 'local' ? this?.window?.localStorage : this?.window?.sessionStorage;
      ref.setItem(key, data);
      return of('success');
    } catch (e) {
      return of('failure');
    }
  }

  get(key: string, store: Store = 'local'): Observable<string> {
    const ref = store === 'local' ? this?.window?.localStorage : this?.window?.sessionStorage;
    const userData = ref.getItem(key);
    return of(userData);
  }
}
