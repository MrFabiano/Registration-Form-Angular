import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../model/client';
import { AppConstants } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  //url API
  //private url:string = 'http:localhost:8080';

  constructor(private httpClient: HttpClient) {}

  selection(): Observable<Client[]>{
    const url = `${AppConstants.baseUrl}/client`
    return this.httpClient.get<Client[]>(url);
  }

  create(client: Client): Observable<Client>{
    const url = `${AppConstants.baseUrl}/client`
    return this.httpClient.post<Client>(url, client);

  }

  edit(client: Client): Observable<Client>{
    const url = `${AppConstants.baseUrl}/client`
    return this.httpClient.put<Client>(url, client);

  }

}


