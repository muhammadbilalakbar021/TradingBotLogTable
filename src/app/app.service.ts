import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(public http: HttpClient) {}

  get(): any {
    return this.http.get('https://staging.irobot.link/external-exchanges/logs');
  }
}
