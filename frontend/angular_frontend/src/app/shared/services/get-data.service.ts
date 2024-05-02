import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../model/Course';
import { User } from '../model/User';

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

  listActiveCourses() {
    const header = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const body = new URLSearchParams();

    return this.http.post<Course[]>('http://localhost:5000/app/getActiveCourses', body, {headers: header, withCredentials: true});
  }

  getCourseByTitle(title: string) {
    const header = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const body = new URLSearchParams();
    body.set('title', title)

    return this.http.post<Course[]>('http://localhost:5000/app/getCourseByTitle', body, {headers: header, withCredentials: true});
  }

  getActiveCourseByTitle(title: string) {
    const header = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const body = new URLSearchParams();
    body.set('title', title)

    return this.http.post<Course[]>('http://localhost:5000/app/getActiveCourseByTitle', body, {headers: header, withCredentials: true});
  }

  getJoinedCourses(name: string) {
    const header = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const body = new URLSearchParams();
    body.set('name', name)

    return this.http.post<Course[]>('http://localhost:5000/app/getUserCourses', body, {headers: header, withCredentials: true});
  }

  
  getCurrentUser() {
    const header = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const body = new URLSearchParams();

    return this.http.post<User>('http://localhost:5000/app/currentUser', {}, {headers: header, withCredentials: true});
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

  joinCourse(title: string, name: string) {
    const header = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const body = new URLSearchParams();
    body.set('title', title)
    body.set('student', name)


    return this.http.post('http://localhost:5000/app/addStudentToCourse', body, {headers: header, withCredentials: true, responseType: 'text'});
  }

  leaveCourse(title: string, name: string) {
    const header = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const body = new URLSearchParams();
    body.set('title', title)
    body.set('student', name)


    return this.http.post('http://localhost:5000/app/removeStudentFromCourse', body, {headers: header, withCredentials: true, responseType: 'text'});
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

  setActive(title: string){
    const header = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const body = new URLSearchParams();
    body.set('title', title)

    return this.http.post('http://localhost:5000/app/setActive', body, {headers: header, withCredentials: true, responseType: 'text'});
  }


}
