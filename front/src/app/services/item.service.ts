import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemFields } from '../types/common';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  create(message_id: number, data: ItemFields) {
    return this.http.post(`${environment.APP_URL}items/${message_id}`, data)
  }

  get(message_id: number) {
    return this.http.get(`${environment.APP_URL}items/${message_id}`)
  }

  delete(id: number) {
    return this.http.delete(`${environment.APP_URL}items/${id}`)
  }
  update(id:number, data: ItemFields) {
    return this.http.put(`${environment.APP_URL}items/${id}`,data)
  }
}
