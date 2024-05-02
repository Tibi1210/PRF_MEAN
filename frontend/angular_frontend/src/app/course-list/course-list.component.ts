import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Course } from '../shared/model/Course';
import { GetDataService } from '../shared/services/get-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.scss'
})
export class CourseListComponent implements OnChanges {
  @Input() filter?: string
  @Output() editActive = new EventEmitter<string>()

  courses?: Course[]

  constructor(private getData: GetDataService, private router: Router){}


  ngOnChanges(){
    if (this.filter === "") {
      this.getData.listAllCourses().subscribe({
        next: (data) => {
          if (data) {
            this.courses = data            
          }
        }, error: (err) =>{
          if (err) {
            console.log(err);
          }
        }
      })
    }else{
      this.getData.getCourseByTitle(this.filter!).subscribe({
        next: (data) => {
          if (data) {
            this.courses = data
          }
        }, error: (err) =>{
          if (err) {
            console.log(err);
          }
        }
      })
    }
  }

  editCourse(title: string){
    this.editActive.emit(title)
  }
  deleteCourse(title: string){
    this.getData.deleteCourseByTitle(title).subscribe({
      next: (data) => {
        if (data) {
          console.log(data);
          this.router.navigateByUrl('/reload', { skipLocationChange: true }).then(() => {
            this.router.navigateByUrl('/home');
        });   
        }
      }, error: (err) =>{
        if (err) {
          console.log(err);
        }
      }
    })
  }
}
