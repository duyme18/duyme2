import { Injectable } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';

@Injectable()
export class Permissions {
    constructor(private tokenStorageService: TokenStorageService) { }

    canActivate(): boolean {
        if (this.tokenStorageService.getToken()) {
            return true;
        } else {
            return false;
        }
    }

    isAdmin(): boolean {
        if (this.tokenStorageService.getAuthorities()[0] === 'ADMIN') {
            return true;
        } else {
            return false;
        }
    }
}