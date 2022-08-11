import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BotFields } from '../types/common';

@Injectable({
  providedIn: 'root'
})
export class BotService {

  constructor(private http: HttpClient) { }

  create(data: BotFields) {
    return this.http.post(`${environment.APP_URL}bots/`, data)
  }

  get() {
    return this.http.get(`${environment.APP_URL}bots/`)
  }

  delete(id: number) {
    return this.http.delete(`${environment.APP_URL}bots/${id}`)
  }
  update(id:number, data: BotFields) {
    return this.http.put(`${environment.APP_URL}bots/${id}`,data)
  }
}
