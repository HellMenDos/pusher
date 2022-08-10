import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment  } from 'src/environments/environment';
import { SignToken } from 'src/app/types/common';
import { StorageService } from 'src/app/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private storage: StorageService
  ) { }

  registration(email: string, password: string): Observable<SignToken> {
    return this.http.post<SignToken>(`${environment.APP_URL}users/signup`, {
      email,
      password
    }).pipe(
      map((data) => this.storage.setData<SignToken>("tokens",data)),
    )
  }

  login(email: string, password: string) {
    return this.http.post<SignToken>(`${environment.APP_URL}users/signin`, {
      email,
      password
    }).pipe(
      map((data) => this.storage.setData<SignToken>("tokens",data)),
    )
  }
}
