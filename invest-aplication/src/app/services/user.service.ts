import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/user';

  constructor(private httpClient: HttpClient) {}

  updateProfile(formData: FormData): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/update`, formData);
  }

  deleteAccount(): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/delete`);
  }
}
