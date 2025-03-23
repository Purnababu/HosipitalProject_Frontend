import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { QuizResult } from 'src/app/quiz-result';
import { AuthService } from 'src/app/Services/auth.service';
import { StudentServiceService } from 'src/app/Services/student-service.service';

@Component({
  selector: 'app-user-purchase-history',
  templateUrl: './user-purchase-history.component.html',
  styleUrls: ['./user-purchase-history.component.scss']
})
export class UserPurchaseHistoryComponent  {


 cousename:string='Archived COVID-19';
    emial:string;
    quizAlreadySubmitted: boolean = false;


 constructor(private auth:AuthService,
  private service:StudentServiceService,
  private location: Location
 ){
    this.emial=this.auth.getEmployeeId();
    console.log(this.emial);
 }

selectedModule: any = null;
  currentSlide: number = 0;
  showQuiz: boolean = false;
  userAnswers: string[] = [];
  quizScore: number = 0;
  quizSubmitted: boolean = false;

  modules = [
    { 
      title: 'Module 1: COVID-19 Training', 
      description: 'Learn about COVID-19 safety measures.', 
      slides: [
        'Introduction to COVID-19 COVID-19 (Coronavirus Disease 2019) is caused by the SARS-CoV-2 virus It spreads primarily through respiratory droplets from infected individuals.Originated in late 2019 and has affected millions worldwide.Understanding its impact helps in effective prevention and control.',
        'Symptoms & Prevention Fever, cough, shortness of breath, fatigue, body aches, loss of taste or smell Severe cases may lead to pneumonia or respiratory failure The symptoms of COVID-19 can vary from mild to severe, with common signs including fever, cough, shortness of breath, fatigue, and loss of taste or smell. Some individuals may experience severe complications such as pneumonia, respiratory failure, or organ damage. To prevent infection, it is essential to practice regular handwashing with soap for at least 20 seconds, use hand sanitizers with at least 60% alcohol, and avoid touching the face. Wearing masks, maintaining good hygiene, and staying home when feeling unwell are effective ways to reduce the risk of infection',
        'Social Distancing GuidelinesSocial distancing is one of the most effective strategies for preventing the spread of COVID-19. Maintaining a safe distance of at least 6 feet (2 meters) from others can significantly reduce the risk of transmission. Avoiding crowded areas, limiting social gatherings, and working remotely when possible are essential measures. Public places, including offices, schools, and businesses, must implement safety protocols to ensure minimal physical contact. By following these guidelines, individuals can contribute to reducing the spread of the virus',
        'PPE UsagePersonal Protective Equipment (PPE) plays a vital role in preventing COVID-19 infections, especially for healthcare workers and frontline employees. Wearing masks properly, covering both the nose and mouth, can significantly reduce transmission. Disposable masks should be changed regularly, and reusable ones should be washed frequently. In high-risk environments, additional PPE, such as gloves, face shields, and gowns, should be used. Proper handling and disposal of PPE are necessary to avoid contamination and maintain overall safety',
        'Vaccination ImportanceVaccination is one of the most effective ways to protect against COVID-19. Approved vaccines, such as those developed by Pfizer, Moderna, and AstraZeneca, help prevent severe illness, hospitalization, and death. Vaccines work by stimulating the bodys immune response, making it more resilient against the virus. While mild side effects like fever and fatigue may occur, the benefits far outweigh the risks. Encouraging widespread vaccination helps achieve herd immunity, reducing the viruss overall impact and ensuring a safer environment for everyone',
        'Handling COVID-19 in the Workplace Workplaces must adopt strict health and safety protocols to minimize the risk of COVID-19 transmission. Regular sanitization of surfaces, mandatory mask-wearing, and maintaining proper ventilation are essential measures. Employers should implement flexible work arrangements, such as remote work and staggered shifts, to reduce employee exposure. Conducting daily health screenings, including temperature checks, can help identify potential cases early. Providing mental health support and ensuring access to medical care further contribute to a safe and productive work environment',
        'Thank You Thank you for participating in this COVID-19 training module. Staying informed and practicing safety measures can help protect yourself, your family, and your community. By following preventive guidelines, maintaining social distancing, using PPE correctly, and getting vaccinated, we can collectively overcome this pandemic. For the latest updates and information, refer to trusted health organizations such as the World Health Organization (WHO) and the Centers for Disease Control and Prevention (CDC). Stay safe and take proactive steps to safeguard your health and the well-being of those around you.'
      ] 
    },
    { 
            title: 'Module 2: Clinical Governance', 
            description: 'Best practices for clinical governance.', 
            slides: [
              'What is Clinical Governance? Clinical governance is a framework through which healthcare organizations maintain and improve the quality of patient care. It ensures that medical services are safe, effective, and continuously enhanced. This concept integrates policies, procedures, and accountability to create a culture of excellence in healthcare. By implementing clinical governance, hospitals and medical institutions can minimize risks, enhance patient trust, and ensure compliance with healthcare standards. It plays a crucial role in improving overall healthcare delivery and maintaining high professional standards.',
              'Patient Safety & Risk Management Patient safety is a fundamental aspect of clinical governance, focusing on reducing errors and ensuring high-quality care. Risk management involves identifying potential threats to patient well-being and implementing strategies to prevent harm. This includes proper hygiene, accurate medication administration, and thorough patient assessments. Reporting and analyzing incidents help healthcare providers learn from mistakes and implement corrective actions. A proactive approach to patient safety builds confidence in healthcare services and improves overall outcomes.',
              'Every healthcare professional has a role in maintaining clinical governance. Doctors, nurses, administrators, and support staff must work collaboratively to uphold best practices. Leadership plays a crucial role in setting policies, while frontline workers ensure their implementation. Responsibilities include adhering to ethical standards, maintaining patient confidentiality, and continuously improving skills through training. Effective teamwork, clear communication, and accountability ensure the smooth operation of healthcare services. A well-defined governance structure promotes efficiency and high-quality patient care',
              'Compliance & Regulations Healthcare organizations must comply with legal and ethical regulations to ensure safe medical practices. Regulatory bodies set standards for patient care, data protection, and professional conduct. Failure to comply can lead to legal consequences, reputational damage, and compromised patient safety. Regular audits, training, and adherence to established protocols help institutions stay compliant. Understanding and following guidelines from governing authorities, such as the National Health Service (NHS) and the World Health Organization (WHO), is essential for maintaining credibility and operational excellence.',
              'Quality Assurance Quality assurance in clinical governance involves continuous monitoring and improvement of healthcare services. It ensures that patients receive the best possible care by evaluating performance, gathering feedback, and implementing necessary changes. Clinical audits, peer reviews, and patient satisfaction surveys are common methods of assessing quality. Healthcare providers must stay updated with advancements in medical science and adopt evidence-based practices. Maintaining high-quality standards leads to better patient outcomes and strengthens trust in medical institutions.',
              'Handling Medical Records Proper management of medical records is vital for patient safety and healthcare efficiency. Accurate documentation ensures continuity of care and helps healthcare professionals make informed decisions. Records should be stored securely to protect patient confidentiality and comply with data protection laws. Digital record-keeping systems enhance accessibility, reduce errors, and improve efficiency. Healthcare staff must be trained in proper documentation procedures to avoid miscommunication and ensure compliance with medical regulations',
                'Thank You for participating in this clinical governance training module. Understanding and implementing best practices in healthcare governance is essential for improving patient safety, ensuring regulatory compliance, and delivering high-quality medical care. By prioritizing patient well-being, maintaining ethical standards, and fostering a culture of continuous improvement, healthcare professionals can create a safer and more efficient medical environment. For further guidance, refer to professional medical organizations and regulatory authorities. Stay committed to excellence in clinical governance for better healthcare outcomes.'
            ] 
          },
    { 
      title: 'Final Assessment Quiz', 
      description: 'Test your knowledge on the modules.', 
      quiz: [
        { question: 'What is the primary symptom of COVID-19?', options: ['Cough', 'Fever', 'Both'], correct: 'Cough' },
        { question: 'What does PPE stand for?', options: ['Personal Protective Equipment', 'Public Protection Emergency'], correct: 'Personal Protective Equipment' },
        { question: 'What is GDPR?', options: ['Data Protection Law', 'Employment Law'], correct: 'Data Protection Law' },
        { question: 'What is the best way to handle workplace conflict?', options: ['Avoid it', 'Use mediation & negotiation'], correct: 'Use mediation & negotiation' },
      ]
    }
  ];

  openModule(module: any) {
    this.selectedModule = module;
    this.currentSlide = 0;
    this.showQuiz = !!module.quiz;
    this.userAnswers = new Array(module?.quiz?.length).fill('');
    this.quizSubmitted = false;
  }

  closeModule() {
    this.selectedModule = null;
    this.showQuiz = false;
  }

  nextSlide() {
    if (this.currentSlide < this.selectedModule.slides.length - 1) {
      this.currentSlide++;
    }
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }

  


  // submitQuiz() {
  //   this.quizScore = this.selectedModule.quiz.reduce((score: number, question: any, index: number) => {
  //     return score + (this.userAnswers[index] === question.correct ? 1 : 0);
  //   }, 0);
  
  //   this.quizSubmitted = true;
  
  //   const quizResult: QuizResult = {
  //     employeeEmail: this.emial,
  //     courseName: this.cousename,
  //     userAnswers: this.userAnswers,
  //     score: this.quizScore,
  //     result: this.quizScore > 2 ? 'Passed' : 'Failed',
  //     submittedTime: new Date()

  //   };
  
  //   this.service.submitQuizResult(quizResult).subscribe(
  //     response => console.log('Quiz result submitted successfully:', response),
  //     error => console.error('Error submitting quiz result:', error)
  //   );
  // }
  
  submitQuiz() {
    if (this.quizAlreadySubmitted) {
      console.log('Quiz already submitted. You cannot retake it.');
    
      return;
    }
  
    this.quizScore = this.selectedModule.quiz.reduce((score: number, question: any, index: number) => {
      return score + (this.userAnswers[index] === question.correct ? 1 : 0);
    }, 0);
  
    this.quizSubmitted = true;
    this.quizAlreadySubmitted = true; // Prevent further submissions
  
    const quizResult: QuizResult = {
      employeeEmail: this.emial,
      courseName: this.cousename,
      userAnswers: this.userAnswers,
      score: this.quizScore,
      result: this.quizScore > 2 ? 'Passed' : 'Failed',
      submittedTime: new Date(),
      
    };
    this.service.submitQuizResult(quizResult).subscribe(
      response => {
        alert('Quiz result submitted successfully!'),
        console.log('Quiz result submitted successfully:', response)
      },
      error => {
        alert('Alredy Submitted.');
        console.error('Error submitting quiz result:', error)
      }
    );
  }

  printQuizResult() {
    const submissionTime = new Date().toLocaleString();
    const result = this.quizScore > 2 ? 'Passed' : 'Failed';
  
    console.log('----------------------------');
    console.log('Course Name:', this.cousename);
    console.log('Email:', this.emial);
    console.log('Quiz Score:', this.quizScore, '/', this.selectedModule.quiz.length);
    console.log('Result:', result);
    console.log('Submission Time:', submissionTime);
    console.log('----------------------------');
  }


  goBack() {
    this.location.back(); // ✅ Goes to the previous page
  }
  
}
