import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  isAutenticado: boolean = false;
  isAdmin: boolean = false;

  constructor(private router: Router) {
    const authStatus = localStorage.getItem('authStatus');
    const adminStatus = localStorage.getItem('adminStatus');

    this.isAutenticado = authStatus === 'true';
    this.isAdmin = adminStatus === 'true';
  }

  login(token: string): void {
    const decodedToken: any = this.decodeToken(token);

    if (decodedToken && decodedToken.roles) {
      this.setAuthState(true, decodedToken.roles.includes('ADMIN'));
      localStorage.setItem('token', token);
      this.router.navigate(['/dashboard']);
    } else {
      this.logout();
    }
  }

  logout(): void {
    localStorage.clear();
    this.setAuthState(false, false);
    this.router.navigate(['/']);
  }

  private setAuthState(authStatus: boolean, adminStatus: boolean): void {
    this.isAutenticado = authStatus;
    this.isAdmin = adminStatus;
    localStorage.setItem('authStatus', JSON.stringify(authStatus));
    localStorage.setItem('adminStatus', JSON.stringify(adminStatus));
  }

  getAuthStatus(): boolean {
    return JSON.parse(localStorage.getItem('authStatus') || 'false');
  }

  private getAdminStatus(): boolean {
    return JSON.parse(localStorage.getItem('adminStatus') || 'false');
  }

  private decodeToken(token: string): any {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));  // Decodifica manualmente o payload
      console.log(payload);
      return payload;
    } catch (e) {
      return null;
    }
  }
}
