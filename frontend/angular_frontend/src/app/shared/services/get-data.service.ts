import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../model/Course';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private http: HttpClient) { }

  listAllCourses() {
    const header = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const body = new URLSearchParams();

    return this.http.post<Course[]>('http://localhost:5000/app/getEveryCourse', body, {headers: header, withCredentials: true});
  }
}
