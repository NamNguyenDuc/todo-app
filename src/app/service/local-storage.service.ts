import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class LocalStorageService {
  private localStorage: any;

  public isExist(key: string): boolean {
    return !!localStorage.getItem(key);
  }

  public getItem(key: string): any {
    if (this.isExist(key)) {
      const value = localStorage.getItem(key);
      return typeof value === 'string' ? value : JSON.parse(this.localStorage.getItem(key));
    }
    return null;
  }

  public setItem(key: string, value: any): any {
    if (typeof value === 'string') {
      return localStorage.setItem(key, value);
    }
    return localStorage.setItem(key, JSON.stringify(value));
  }

  public removeItem(key: string): any {
    return localStorage.removeItem(key);
  }

  public clearAll(): any {
    return localStorage.clear();
  }
}
