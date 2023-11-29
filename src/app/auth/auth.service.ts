import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericResponse } from '../models/generic-response.model';
import { AuthResponse } from '../models/auth-response.model';
import { UserSignUp } from '../models/user-signup.model';
import { User } from '../models/user.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) { }

  login(email: string, password: string): Observable<GenericResponse<AuthResponse>> {
    return this.http.post<GenericResponse<AuthResponse>>(`/api/users/login`, { email, password }, httpOptions);
  }

  register(user: UserSignUp): Observable<GenericResponse<AuthResponse>> {
    return this.http.post<GenericResponse<AuthResponse>>(`/api/users/register`, user, httpOptions);
  }

  saveUser(user: User): void {
    window.localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): User {
    const user = JSON.parse(window.localStorage.getItem('user'));
    return user;
  }

  logout(): void {
    window.localStorage.clear();
  }
}
