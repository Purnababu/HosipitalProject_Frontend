import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../components/Modals/employee';
import { EducationalDetails } from '../components/Modals/educational-details';
import { QuizResult } from '../quiz-result';

@Injectable({
  providedIn: 'root'
})


export class StudentServiceService {

  
  // private apiUrl = 'http://localhost:8080';
  private apiUrl = 'https://backendddd-ebcdd02b0752.herokuapp.com';

  

  constructor(private http: HttpClient) { }

  registerEmployee(employee:Employee,roleName:string): Observable<any> {
    return this.http.post(`${this.apiUrl}/addEmployee/${roleName}`, employee);
  }

  login(data: any) {
    return this.http.post<any>(`${this.apiUrl}/login`, data);
  }


  getAllEmployees(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getAllEmployes`);
  }



  // --------------------------------------------------------
  // Submit quiz result
  submitQuizResult(result: QuizResult): Observable<QuizResult> {
    return this.http.post<QuizResult>(`${this.apiUrl}/saveReslu`, result);
  }

  getAllEmployeeResults(): Observable<QuizResult[]> {
    return this.http.get<QuizResult[]>(`${this.apiUrl}/getallresults`);
  }

  
 // Check if submission exists
 checkSubmissionStatus(email: string, course: string): Observable<string> {
  return this.http.get(`${this.apiUrl}/check?employeeEmail=${email}&courseName=${course}`, {
    responseType: 'text'
  });
}

}
