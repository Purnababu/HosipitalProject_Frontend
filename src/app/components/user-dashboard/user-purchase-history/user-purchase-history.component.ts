import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/Services/auth.service';
import { StudentServiceService } from 'src/app/Services/student-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-purchase-history',
  templateUrl: './user-purchase-history.component.html',
  styleUrls: ['./user-purchase-history.component.scss']
})
export class UserPurchaseHistoryComponent implements OnInit {

Backtohome(_t8: { title: string; description: string; slides: string[]; quiz?: undefined; }|{ title: string; description: string; quiz: { question: string; options: string[]; correct: string; }[]; slides?: undefined; }) {
  this.router.navigate(['/instructor-dashboard']);
}
  cousename: string = 'Archived COVID-19';
  emial: string;

  selectedModule: any = null;
  currentSlide: number = 0;
  showQuiz: boolean = false;
  quizStarted: boolean = false;
  quizSubmitted: boolean = false;
  userAnswers: string[] = [];
  quizScore: number = 0;
  timeLeft: number = 30;
  quizTimer: any;
  showTermsModal: boolean = false;

  modules = [
    {
      title: 'Module 1: COVID-19 Training',
      description: 'Learn about COVID-19 safety measures.',
      slides: [
        'Introduction to COVID-19...',
        'Symptoms & Prevention...',
        'Social Distancing Guidelines...',
        'PPE Usage...',
        'Vaccination Importance...',
        'Handling COVID-19 in the Workplace...',
        'Thank You...'
      ]
    },
    {
      title: 'Module 2: Clinical Governance',
      description: 'Best practices for clinical governance.',
      slides: [
        'What is Clinical Governance...',
        'Patient Safety & Risk Management...',
        'Roles in Clinical Governance...',
        'Compliance & Regulations...',
        'Quality Assurance...',
        'Handling Medical Records...',
        'Thank You for participating...'
      ]
    },
    {
      title: 'Final Assessment Quiz',
      description: 'Test your knowledge on the modules.',
      quiz: [
        { question: 'What is the primary symptom of COVID-19?', options: ['Cough', 'Fever', 'Both'], correct: 'Cough' },
        { question: 'What does PPE stand for?', options: ['Personal Protective Equipment', 'Public Protection Emergency'], correct: 'Personal Protective Equipment' },
        { question: 'What is GDPR?', options: ['Data Protection Law', 'Employment Law'], correct: 'Data Protection Law' },
        { question: 'What is the best way to handle workplace conflict?', options: ['Avoid it', 'Use mediation & negotiation'], correct: 'Use mediation & negotiation' }
      ]
    }
  ];

  constructor(
    private auth: AuthService,
    private service: StudentServiceService,
    private location: Location,
    private router: Router
  ) {
    this.emial = this.auth.getEmployeeId();
    console.log('User Email:', this.emial);
  }

  ngOnInit(): void {
  this.checkIfEligibleToStartQuiz();
  }

  openModule(module: any): void {
    this.selectedModule = module;
    this.currentSlide = 0;
    this.showQuiz = !!module.quiz;
    this.quizStarted = false;
    this.quizSubmitted = false;
    this.quizScore = 0;
    this.userAnswers = module.quiz ? new Array(module.quiz.length).fill('') : [];
    if (this.quizTimer) clearInterval(this.quizTimer);
    this.timeLeft = 30;

    if (this.showQuiz) {
      this.showTermsModal = true;
    }
  }

  closeModule(): void {
    this.selectedModule = null;
    this.showQuiz = false;
    this.quizStarted = false;
    this.quizSubmitted = false;
    if (this.quizTimer) clearInterval(this.quizTimer);
  }

  nextSlide(): void {
    if (this.currentSlide < this.selectedModule.slides.length - 1) {
      this.currentSlide++;
    }
  }

  prevSlide(): void {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }

  // acceptTerms(): void {
  //   this.showTermsModal = false;
  //   this.startQuiz();
  // }

  acceptTerms(): void {
    this.showTermsModal = false;
    this.checkIfEligibleToStartQuiz();
  }
  
  
  startQuiz(): void {

    if (this.quizSubmitted) return;
    this.quizStarted = true;
    this.quizSubmitted = false;
    this.timeLeft = 30;
    this.startTimer();
  }

  startTimer(): void {
    this.quizTimer = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        clearInterval(this.quizTimer);
        this.submitQuiz(); // Auto-submit
      }
    }, 1000);
  }

  submitQuiz(): void {
    if (this.quizSubmitted) return;

    clearInterval(this.quizTimer);
    this.quizScore = 0;

    this.selectedModule.quiz.forEach((q: any, index: number) => {
      if (this.userAnswers[index] === q.correct) {
        this.quizScore++;
      }
    });

    const result = {
      employeeEmail: this.emial,
      courseName: this.cousename,
      score: this.quizScore,
      userAnswers: this.userAnswers,
      result: this.quizScore >= 3 ? 'Pass' : 'Fail',
      submittedTime: new Date()
    };

    this.service.submitQuizResult(result).subscribe({
      next: (res) => {
        this.quizSubmitted = true;
        alert('Quiz submitted successfully!');
        this.router.navigate(['/instructor-dashboard']);
      },
      error: (err) => {
        if (err.status === 409) {
          alert('You have already submitted this quiz.');
          this.quizSubmitted = true;
        } else {
          alert('You have already submitted this quiz..');
          console.error(err);
        }
        
      }
    });
  }
// ------------------------------------------------------------------------------------------------------

  // checkSubmissionStatus(): void {
  //   const email = this.emial; // make sure spelling is correct: this.email
  //   const courseName = this.cousename; // same here: this.courseName
  
  //   this.service.checkSubmissionStatus(email, courseName).subscribe(
  //     response => {
  //       console.log('Submission Status:', response);
  //       if (response === 'Already Done') {
  //       } else {
         
  //       }
  //     },
  //     error => {
  //       console.error('Error checking submission status:', error);
  //     }
  //   );
  // }

  checkIfEligibleToStartQuiz(): void {
    console.log('Checking eligibility to start quiz...'); // Confirm method runs
    const email = this.emial;
    const courseName = this.cousename;
  
    this.service.checkSubmissionStatus(email, courseName).subscribe(
      response => {
        console.log('Submission Status:', response); // Expected log
        if (response === 'Already Done') {
          alert('You have already submitted the quiz.');
          this.router.navigate(['/instructor-dashboard']);
        } else {
          this.startQuiz();
        }
      },
      error => {
        console.error('Error checking submission status:', error);
        alert('Something went wrong while checking eligibility.');
      }
    );
  }
  
  
  

}
