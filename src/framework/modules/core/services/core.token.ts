import { InjectionToken } from '@angular/core';
import { IUserDetails } from '../models/user.model';

export const LOGGEDIN_USER = new InjectionToken<IUserDetails>('LOGGEDIN_USER');
