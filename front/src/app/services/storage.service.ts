import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setData<T>(name:string, data: T): T {
    localStorage.setItem(name,JSON.stringify(data))
    return data
  }

  getData(name:string) {
    return JSON.parse(localStorage.getItem(name) as string)
  }
}
