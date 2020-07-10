import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const api = environment;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }


  public isAuthentificated(): boolean {
    // const token = localStorage.getItem('token');
    //check token expire
    return true;
  }
}
