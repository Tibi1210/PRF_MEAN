import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MyLoginComponent } from './my-login/my-login.component';
import { MySignupComponent } from './my-signup/my-signup.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MyLoginComponent, MySignupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular_frontend';
}
