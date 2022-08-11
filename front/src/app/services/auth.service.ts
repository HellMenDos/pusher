import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment  } from 'src/environments/environment';
import { SignToken } from 'src/app/types/common';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { NewBotPopUp } from '../compoents/popup/new-bot/new-bot.popup';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private router: Router,
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

  refresh() {
    const data = this.storage.getData("tokens")

    this.http.get<SignToken>(`${environment.APP_URL}users/refresh/`,{
      headers: {
        Authorization: `Bearer ${data?.refresh_token}`
      }
    }).subscribe({
      next: (data) => this.storage.setData<SignToken>("tokens",data),
      error: (error) => {
        this.storage.remove("tokens")
        this.router.navigate(['/auth'])
      }
    })
  }
}
