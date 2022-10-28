import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { AppUser } from '../modele/appUser.modele';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  users!: Array<AppUser>;
  authenticatedUser: AppUser | undefined;

  constructor() {
    this.users = [
      { id: 0, username: 'nadori', password: '1234', roles: ['admin', 'user'] },
      { id: 0, username: 'Hicham', password: '1234', roles: ['user'] },
      {
        id: 0,
        username: 'Loukili',
        password: '12345',
        roles: ['user', 'admin'],
      },
    ];
  }

  // Login Methode
  public login(username: string, password: string): Observable<AppUser> {
    let appUser = this.users.find((us) => us.username === username);

    if (!appUser) {
      return throwError(() => new Error('User not found !!'));
    }

    if (appUser.password !== password) {
      return throwError(() => new Error('Bad credencials'));
    }

    return of(appUser);
  }

  //Authentication

  public authenticatUser(appUser: AppUser): Observable<boolean> {
    this.authenticatedUser = appUser;
    localStorage.setItem(
      'authUser',
      JSON.stringify({
        username: appUser.username,
        roles: appUser.roles,
        jwt: 'JWT_TOKEN',
      })
    );

    return of(true);
  }

  // cheek if user has roles

  public hasRole(role: string): boolean {
    return this.authenticatedUser!.roles.includes(role);
  }

  // Logout
  public logout(): Observable<boolean> {
    this.authenticatedUser = undefined;
    localStorage.removeItem('authUser');
    return of(true);
  }

  // cheek if user authenticated
  public isAuthenticatedUser() {
    return this.authenticatedUser != undefined;
  }
}
