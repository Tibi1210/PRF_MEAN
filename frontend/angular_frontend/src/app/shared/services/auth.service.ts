import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { User } from '../model/User'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    // HTTP POST request
    const body = new URLSearchParams()
    body.set('username', email)
    body.set('password', password)

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })

    return this.http.post('http://localhost:5000/app/login', body, {headers: headers})
  }

  register(user: User) {
    // HTTP POST request
    const body = new URLSearchParams()
    body.set('name', user.name)
    body.set('email', user.email)
    body.set('password', user.password)

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })

    return this.http.post('http://localhost:5000/app/register', body, {headers: headers})
  }

}