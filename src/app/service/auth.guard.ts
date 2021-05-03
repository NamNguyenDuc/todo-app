import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {LocalStorageService} from './local-storage.service';
import {RestConnector} from './rest.connector';
import {environment} from '../../environments/environment';
import {DataService} from './data.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

    constructor(
        private localStorage: LocalStorageService,
        private router: Router,
        private restConnector: RestConnector,
        private dataService: DataService,
    ) {
    }

    canActivate(): boolean {
        if (!this.localStorage.isExist('token')) {
            this.router.navigateByUrl('/login').then();
            return false;
        }
        // check token is valid
        try {
            this.restConnector.get(environment.CHECK_LOGIN).subscribe(res => {
                if (res?.success) {
                    this.dataService.changeStatusLogin(true);
                    this.dataService.changeUserProfile(res.user);
                    return true;
                } else {
                    this.localStorage.removeItem('token');
                    this.router.navigateByUrl('/login').then();
                    return false;
                }
            });
        } catch (e) {
            this.router.navigateByUrl('/login').then();
            return false;
        }
        return true;
    }
}
