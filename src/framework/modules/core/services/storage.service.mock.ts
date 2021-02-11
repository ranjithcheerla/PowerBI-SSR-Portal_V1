import { of } from 'rxjs';
import { Store } from '../types/store.type';

export const mockStorageService = {
  get: (key: string, store: Store = 'local') => of({}),
  set: (key: string, data: any, store: Store = 'local') => of({})
};
