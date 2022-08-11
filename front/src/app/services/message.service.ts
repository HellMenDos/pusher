import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageFields } from '../types/common';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  create(bot_id: number, data: MessageFields) {
    return this.http.post(`${environment.APP_URL}messages/${bot_id}`, data)
  }

  get(bot_id: number) {
    return this.http.get(`${environment.APP_URL}messages/${bot_id}`)
  }

  delete(id: number) {
    return this.http.delete(`${environment.APP_URL}messages/${id}`)
  }
  update(id:number, data: MessageFields) {
    return this.http.put(`${environment.APP_URL}messages/${id}`,data)
  }
}
