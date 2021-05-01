import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private statusLogin = new BehaviorSubject(false);
  currentStatusLogin = this.statusLogin.asObservable();

  private userProfile = new BehaviorSubject({});
  currentUserProfile = this.userProfile.asObservable();

  constructor() { }

  changeStatusLogin(value: boolean): void {
    this.statusLogin.next(value);
  }

  changeUserProfile(value: any): void {
    this.userProfile.next(value);
  }
}
