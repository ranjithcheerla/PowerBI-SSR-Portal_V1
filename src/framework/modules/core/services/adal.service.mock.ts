import { of } from 'rxjs';

export const mockAdalService = {
  acquireToken: (resource: string) => of('token12345'),
  user: 'rchinnakampalli@worldbankgroup.org',
  signout: () => {},
  isLogged: true
};
