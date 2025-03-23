import { Component } from '@angular/core';
import { StudentServiceService } from '../Services/student-service.service';
import { QuizResult } from '../quiz-result';

@Component({
  selector: 'app-employe-result',
  templateUrl: './employe-result.component.html',
  styleUrls: ['./employe-result.component.scss']
})
export class EmployeResultComponent {

  employeeResults: QuizResult[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(private employeeResultService: StudentServiceService) {}

  ngOnInit(): void {
    this.fetchResults();
  }

  fetchResults(): void {
    this.employeeResultService.getAllEmployeeResults().subscribe({
      next: (data) => {
        this.employeeResults = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load employee results!';
        this.isLoading = false;
      }
    });
  }

}
