import { Component, OnInit } from '@angular/core';
import { StudentServiceService } from 'src/app/Services/student-service.service';
import { Employee } from '../../Modals/employee';
import { EducationalDetails } from '../../Modals/educational-details'; // Import EducationalDetails model

@Component({
  selector: 'app-instructor-students',
  templateUrl: './instructor-students.component.html',
  styleUrls: ['./instructor-students.component.scss']
})
export class InstructorStudentsComponent implements OnInit {

  employees: Employee[] = [];
  errorMessage: string = '';
  selectedEmployeeId: string = '';  // Store the selected employee's ID
  educationalDetails: EducationalDetails = { degree: '', university: '', yearOfPassing: 0, grade: 0 };  // Initialize the form
  showModal: boolean = false;  // Control visibility of the modal

  constructor(private service: StudentServiceService) { }

  ngOnInit(): void {
    this.getList();  // Fetch employees on init
  }

  // Fetch list of employees
  getList(): void {
    this.service.getAllEmployees().subscribe(
      (data) => {
        this.employees = data;
        console.log(this.employees);
      },
      (error) => {
        this.errorMessage = 'Error fetching employee data. Please try again later.';
        console.error(error);
      }
    );
  }

 

  // Close modal
  closeModal(): void {
    this.showModal = false;  // Hide modal
  }

 
}
