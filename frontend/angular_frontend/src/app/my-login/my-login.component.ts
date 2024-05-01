import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './my-login.component.html',
  styleUrl: './my-login.component.scss'
})
export class MyLoginComponent implements OnInit{
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router){}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email]],
      password: ['', [Validators.required]]
    })
  }


  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form data:', this.loginForm.value);
    } else {
      console.log('Form is not valid.');
    }
  }

  navigate(to: string){
    this.router.navigateByUrl(to)
  }


}
