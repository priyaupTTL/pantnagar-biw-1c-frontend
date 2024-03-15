import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private http: HttpClient) { }
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  callPostAPI(areaUrl:any, reqData: any) {
    return this.http.post(environment.APIURL + areaUrl, reqData, { headers: this.httpHeaders });
  }
}
