import { Component, OnInit } from '@angular/core';
import { CourseListComponent } from '../course-list/course-list.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { GetDataService } from '../shared/services/get-data.service';
import { User } from '../shared/model/User';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [ReactiveFormsModule, CourseListComponent, CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit{
  searchForm!: FormGroup;
  addCourse!: FormGroup;
  editCourse!: FormGroup;
  courseFilter: string = ""
  courseEdit: string = ""
  newCourse: boolean = false
  user: User | undefined = undefined

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router, private dataServ: GetDataService){}

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchVal: [''],
    })
    this.dataServ.getCurrentUser().subscribe({
      next: (data) => {
        if (data) {
          this.user = data
        }
      }, error: (err) =>{
        if (err) {
          console.log(err);
        } 
      }
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

  addCourseFn(){
    if (this.addCourse.valid) {
      this.dataServ.createCourse(this.addCourse.value['title'], this.addCourse.value['desc'], this.addCourse.value['roadmap'], this.addCourse.value['limit'], this.addCourse.value['teacher']).subscribe({
        next: (data) => {
          if (data) {
            console.log(data);
          }
        }, error: (err) =>{
          if (err) {
            console.log(err);
          }
        }
      })
      this.router.navigateByUrl('/reload', { skipLocationChange: true }).then(() => {
        this.router.navigateByUrl('/home');
    }); 
    } else {
      console.log('Form is not valid.');
    }

  }

  updateCourseFn(){
    if (this.editCourse.valid) {
      this.dataServ.updateCourse(this.courseEdit, this.editCourse.value['desc'], this.editCourse.value['roadmap'], this.editCourse.value['limit'], this.editCourse.value['teacher']).subscribe({
        next: (data) => {
          if (data) {
            console.log(data);
          }
        }, error: (err) =>{
          if (err) {
            console.log(err);
          }
        }
      })
    }
    this.courseEdit=""
    this.router.navigateByUrl('/reload', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl('/home');
  }); 
  }

  navigate(to: string){
    this.router.navigateByUrl(to)
  }

  courseToggle(){
    this.newCourse=!this.newCourse
    if (this.newCourse) {
      this.addCourse = this.formBuilder.group({
        title: ['', [Validators.required]],
        desc: [''],
        roadmap: [''],
        limit: ['', [Validators.required]],
        teacher: ['', [Validators.required]],
      })
    }
  }

  recieveOutput(event: string){
    if (this.courseEdit!==event) {
      this.dataServ.getCourseByTitle(event).subscribe({
        next: (data) => {
          if (data) {
            console.log(data[0]);

            this.courseEdit = event
            this.editCourse = this.formBuilder.group({
              desc: [data[0]['description']],
              roadmap: [data[0]['roadmap']],
              limit: [data[0]['limit'], [Validators.required]],
              teacher: [data[0]['teacher'], [Validators.required]],
            })
          }
        }, error: (err) =>{
          if (err) {
            console.log(err);
          }
        }
      })
      
    }else{
      this.courseEdit=""
    }

  }
}
