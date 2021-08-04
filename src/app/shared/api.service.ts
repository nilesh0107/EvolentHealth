import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = 'http://localhost:3000/contacts';
  constructor(private http: HttpClient) { }

  postContact(data: any) {
    return this.http.post<any>(this.url, data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getContact() {
    return this.http.get<any>(this.url)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  updateContact(data: any, id: number) {
    return this.http.put<any>(this.url + '/' + id, data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  deleteContact(id: number) {
    return this.http.delete<any>(this.url + '/' + id)
      .pipe(map((res: any) => {
        return res;
      }))
  }
}
