import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Course } from '../shared/model/Course';
import { GetDataService } from '../shared/services/get-data.service';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent {
  courses?: Course[]

  constructor(private getData: GetDataService){}

  ngOnInit(){
    this.getData.listAllCourses().subscribe({
      next: (data) => {
        if (data) {
          this.courses = data
          console.log(data);
          
        }
        
      }, error: (err) =>{
        if (err) {
          console.log(err);
        }
        
      }

    })
  }


}
