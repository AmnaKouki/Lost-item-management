import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string) {
    return this.httpClient.post(`http://${window.location.hostname + environment.backendPort}/api/login`, {
      email,
      password,
    });
  }

  register({
    firstName,
    lastName,
    email,
    password,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    return this.httpClient.post(`http://${window.location.hostname + environment.backendPort}/api/register`, {
      name: `${firstName} ${lastName}`,
      email,
      password,
    });
  }

  /**
   * Get current user info
   * @returns {Observable<any>}
   */
  myInfo() {
    return this.httpClient.get(`http://${window.location.hostname + environment.backendPort}/api/user`);
  }
}
