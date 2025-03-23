import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-module-selection-component',
  templateUrl: './module-selection-component.component.html',
  styleUrls: ['./module-selection-component.component.scss']
})
export class ModuleSelectionComponentComponent implements OnInit {

  
 
    moduleId: number = 0;
    moduleName: string = '';
    currentSlide: number = 1;
  
    moduleData: any = {
      1: { title: 'Module 1', content: 'Introduction to Module 1' },
      2: { title: 'Module 2', content: 'Advanced Concepts of Module 2' },
      3: { title: 'Module 3', content: 'Module 3 in Detail' },
      4: { title: 'Module 4', content: 'Module 4 Practical Applications' },
      5: { title: 'Module 5', content: 'Module 5 Case Studies' },
      6: { title: 'Module 6', content: 'Module 6 Summary & Test' }
    };
  
    constructor(private route: ActivatedRoute) {}
  
    ngOnInit() {
      this.route.paramMap.subscribe(params => {
        this.moduleId = Number(params.get('id')) || 1;
        this.moduleName = this.moduleData[this.moduleId]?.title || 'Unknown Module';
      });
    }
  
    prevSlide() {
      if (this.currentSlide > 1) {
        this.currentSlide--;
      }
    }
  
    nextSlide() {
      if (this.currentSlide < 6) {
        this.currentSlide++;
      }
    }
  
    
}
