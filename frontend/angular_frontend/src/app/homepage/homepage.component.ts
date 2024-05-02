import { Component, OnInit } from '@angular/core';
import { CourseListComponent } from '../course-list/course-list.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [ReactiveFormsModule, CourseListComponent, CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit{
  searchForm!: FormGroup;
  courseFilter: string = ""

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router){}

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchVal: [''],
    })
  }

  changeView(){
    this.courseFilter = this.searchForm.value['searchVal']
  }

  logoutBtn(){
    this.auth.logout().subscribe({
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
  }


  navigate(to: string){
    this.router.navigateByUrl(to)
  }
}
