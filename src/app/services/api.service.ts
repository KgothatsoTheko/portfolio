import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
// import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl: string = environment.nodeAppUrl;

  constructor(private http: HttpClient) { }

  private _isDarkTheme = new BehaviorSubject<boolean>(true);
  isDarkTheme$ = this._isDarkTheme.asObservable();

  toggleTheme() {
    const current = this._isDarkTheme.value;
    this._isDarkTheme.next(!current);
  }

  setTheme(isDark: boolean) {
    this._isDarkTheme.next(isDark);
  }

  // Generic Get
  genericGet(endpoint: string) {
    return this.http.get(this.baseUrl + endpoint)
  }

  // Generic Post
  genericPost(endpoint:string, payload:any) {
    return this.http.post(this.baseUrl+endpoint, payload)
  }
}
