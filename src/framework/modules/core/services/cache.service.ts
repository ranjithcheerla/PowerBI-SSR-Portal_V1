import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  constructor() {}
  private _errorMessage = null;

  get errorMessage() {
    return this._errorMessage;
  }
  set errorMessage(message: string) {
    this._errorMessage = message;
  }
}
