import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-my-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './my-signup.component.html',
  styleUrl: './my-signup.component.scss'
})

export class MySignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private auth: AuthService){}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.email]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    },{
      validator: this.mustMatch('password', 'confirmPassword')
    })
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && matchingControl.errors['mustMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.auth.register(this.signupForm.value).subscribe({
        next: (data) => {
          if (data) {
            console.log(data);
            this.navigate('/login')
          }
          
        }, error: (err) =>{
          if (err) {
            console.log(err);
          }
          
        }

      })


    } else {
      console.log('Form is not valid.');
    }
  }

  navigate(to: string){
    this.router.navigateByUrl(to)
  }

}
