import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Course } from '../shared/model/Course';
import { GetDataService } from '../shared/services/get-data.service';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.scss'
})
export class CourseListComponent implements OnChanges {
  @Input() filter?: string

  courses?: Course[]

  constructor(private getData: GetDataService){}

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
}
