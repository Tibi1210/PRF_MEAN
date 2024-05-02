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

  getCourseByTitle(title: string) {
    const header = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const body = new URLSearchParams();
    body.set('title', title)

    return this.http.post<Course[]>('http://localhost:5000/app/getCourseByTitle', body, {headers: header, withCredentials: true});
  }

  createCourse(title: string, description: string, roadmap: string, limit: string, teacher: string) {
    const header = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const body = new URLSearchParams();
    body.set('title', title)
    body.set('description', description)
    body.set('roadmap', roadmap)
    body.set('limit', limit)
    body.set('teacher', teacher)

    return this.http.post<Course>('http://localhost:5000/app/newCourse', body, {headers: header, withCredentials: true});
  }

  updateCourse(title: string, description: string, roadmap: string, limit: string, teacher: string) {
    const header = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const body = new URLSearchParams();
    body.set('title', title)
    body.set('description', description)
    body.set('roadmap', roadmap)
    body.set('limit', limit)
    body.set('teacher', teacher)

    return this.http.post<Course>('http://localhost:5000/app/updateCourse', body, {headers: header, withCredentials: true});
  }

  deleteCourseByTitle(title: string) {
    const header = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const body = new URLSearchParams();
    body.set('title', title)

    return this.http.post('http://localhost:5000/app/deleteCourseByTitle', body, {headers: header, withCredentials: true, responseType: 'text'});
  }


}
