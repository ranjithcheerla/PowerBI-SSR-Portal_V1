import { Observable } from 'rxjs';

export interface User {
  name: string;
  upi: string;
  designation: string;
  location: string;
  phone?: string;
  unit?: string;
  department?: string;
  city?: string;
  dept?: string;
  companyName?: string;
  vpuUnit?: string;
  _userObj?: any;
}

export interface IUserDetails {
  getLoggedUserEmail$(): Observable<string>;
  getLoggedUserEmail(): string;
  getLoggedInUser(): Observable<any>;
  getLoggedInUserUpi(): Promise<string>;
}
