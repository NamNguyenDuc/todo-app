'use strict';
import {Observable, throwError} from 'rxjs';
import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
    HttpParams,
} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrManager} from 'ng6-toastr-notifications';
import {LocalStorageService} from './local-storage.service';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class RestConnector {
    httpOption: any = {};

    constructor(private httpClient: HttpClient,
                private toast: ToastrManager,
                private localStorageService: LocalStorageService,
                private router: Router) {
    }

    private getHttpOption(hasAuth: boolean): any {
        const httpOption = {
            headers: new HttpHeaders({
                    Accept: ['application/json', 'multipart/form-data'],
                    'Access-Control-Allow-Origin': '*'
                },
            ),
            params: new HttpParams(),
        };
        if (hasAuth) {
            httpOption.headers = httpOption.headers.set('token', this.localStorageService.getItem('token'));
        }
        return httpOption;
    }

    handleError(error: HttpErrorResponse): any {
        if (error.error instanceof ErrorEvent) {
            return throwError(error);
        }
        switch (error.status) {
            case 400:
                this.toast.errorToastr('Yêu cầu không hợp lệ');
                break;
            case 401:
                localStorage.clear();
                this.router.navigateByUrl('/login').then();
                break;
            case 404:
                this.toast.errorToastr('Không tồn tại');
                break;
            case 500:
                this.toast.errorToastr('Có lỗi xảy ra');
                break;
            default:
                if (!this.localStorageService.isExist('token')) {
                    this.router.navigateByUrl('/login').then();
                    return;
                }
        }
    }

    getApiUrl(): string {
        return environment.API_URL;
    }

    public get(url: string, hasAuth: boolean = true): Observable<any> {
        const fullUrl: string = this.getApiUrl() + url;
        this.httpOption = this.getHttpOption(hasAuth);
        try {
            return this.httpClient.get<any>(fullUrl, this.httpOption).pipe(
                map((resp: any) => {
                    if (!resp.status) {
                        if (resp.httpCode === 401) {
                            localStorage.clear();
                            this.router.navigateByUrl('/login').then();
                            return;
                        }
                        if (resp.httpCode === 403) {
                            this.toast.warningToastr('Không có quyền truy cập');
                        }
                    }
                    return resp;
                }),
                catchError(error => this.handleError(error))
            );
        } catch (err) {
            throw new Error(err);
        }
    }

    public post(url: string, data: any, hasAuth: boolean = true): Observable<any> {
        const fullUrl: string = this.getApiUrl() + url;
        console.log(fullUrl);
        this.httpOption = this.getHttpOption(hasAuth);
        try {
            return this.httpClient.post<any>(fullUrl, data, this.httpOption).pipe(
                map((resp: any) => {
                    if (!resp.status) {
                        if (resp.httpCode === 401) {
                            localStorage.clear();
                            this.router.navigateByUrl('/login').then();
                            return;
                        }
                        if (resp.httpCode === 403) {
                            this.toast.warningToastr('Không có quyền truy cập');
                        }
                    }
                    return resp;
                }),
                catchError(error => this.handleError(error))
            );
        } catch (err) {
            throw new Error(err);
        }
    }

    public put(url: string, data: any, hasAuth: boolean = true): Observable<any> {
        const fullUrl: string = this.getApiUrl() + url;
        this.httpOption = this.getHttpOption(hasAuth);
        try {
            return this.httpClient.put<any>(fullUrl, data, this.httpOption).pipe(
                map((resp: any) => {
                    if (!resp.status) {
                        if (resp.httpCode === 401) {
                            localStorage.clear();
                            this.router.navigateByUrl('/login').then();
                            return;
                        }
                        if (resp.httpCode === 403) {
                            this.toast.warningToastr('Không có quyền truy cập');
                        }
                    }
                    return resp;
                }),
                catchError(error => this.handleError(error))
            );
        } catch (err) {
            throw new Error(err);
        }
    }

    public delete(url: string, hasAuth: boolean = true): Observable<any> {
        const fullUrl: string = this.getApiUrl() + url;
        this.httpOption = this.getHttpOption(hasAuth);
        try {
            return this.httpClient.delete(fullUrl, this.httpOption).pipe(
                map((resp: any) => {
                    if (!resp.status) {
                        if (resp.httpCode === 401) {
                            localStorage.clear();
                            this.router.navigateByUrl('/login').then();
                            return;
                        }
                        if (resp.httpCode === 403) {
                            this.toast.warningToastr('Không có quyền truy cập');
                        }
                    }
                    return resp;
                }),
                catchError(error => this.handleError(error))
            );
        } catch (err) {
            throw new Error(err);
        }
    }

}
