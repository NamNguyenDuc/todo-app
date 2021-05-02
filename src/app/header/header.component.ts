import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LocalStorageService} from '../service/local-storage.service';
import {DataService} from '../service/data.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    statusLogin = false;
    currentLanguage: any;
    userProfile: any;
    languages = [
        {
            code: 'en',
            name: 'English'
        },
        {
            code: 'vn',
            name: 'Tiếng Việt'
        },
    ];

    constructor(
        private translate: TranslateService,
        private cdr: ChangeDetectorRef,
        private localStorageService: LocalStorageService,
        private dataService: DataService,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
        this.dataService.currentStatusLogin.subscribe(res => {
            this.statusLogin = res;
        });
        this.dataService.currentUserProfile.subscribe(userProfile => {
            console.log(userProfile);
            this.userProfile = userProfile;
        });
        this.getLanguage();
    }

    getLanguage(): void {
        this.currentLanguage = this.localStorageService.getItem('language');
        if (this.currentLanguage) {
            this.translate.setDefaultLang(this.currentLanguage);
            this.translate.use(this.currentLanguage);
        } else {
            this.currentLanguage = 'en';
            this.translate.setDefaultLang(this.currentLanguage);
            this.translate.use(this.currentLanguage);
            this.localStorageService.setItem('language', this.currentLanguage);
        }
    }

    changeLanguage(value: any): void {
        this.translate.setDefaultLang(value);
        this.translate.use(value);
        this.localStorageService.setItem('language', this.currentLanguage);
    }

    logout(): void {
        this.localStorageService.removeItem('token');
        this.dataService.changeStatusLogin(false);
        this.router.navigateByUrl('/login').then();
    }

}
