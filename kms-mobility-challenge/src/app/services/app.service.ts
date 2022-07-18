import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { environment } from '../../environments/environment'
import { Car } from '../models/car';
import { Result } from '../models/result';
@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private router: Router,
    private http: HttpClient) { }
  
  login(username: any, password: any) {
      return this.http.post<Result>(`${environment.apiUrl}carcharter/v1/Challenge/Login?userName=`+username+`&Password=`+password,'')
        .pipe(map(result => {
            localStorage.setItem('user', result.Content);
            return result;
        }));
}
  getCars(){
    let token = localStorage.getItem('user')!;
    const headers=new HttpHeaders({
      'Authorization-token':token
    })
    const options= {headers}
    return this.http.get<Car[]>(`${environment.apiUrl}carcharter/v1/Challenge/GetCars`,options)
        .pipe(map(result => {
            return result;
        }));
  }
  addCars(formData: any){
    let token = localStorage.getItem('user')!;
    const headers=new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization-token':token
    })
    const options= {headers}
    return this.http.post<Car[]>(`${environment.apiUrl}carcharter/v1/Challenge/AddCar`,formData,options)
        .pipe(map(result => {
            return result;
        }));
  }

}
