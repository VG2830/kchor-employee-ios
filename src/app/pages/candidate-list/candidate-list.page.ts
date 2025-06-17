// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-candidate-list',
//   standalone:false,
//   templateUrl: './candidate-list.page.html',
//   styleUrls: ['./candidate-list.page.scss'],
// })
// export class CandidateListPage implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }
import { Component } from '@angular/core';

@Component({
  selector: 'app-candidate-list',
  standalone:false,
  templateUrl: './candidate-list.page.html',
  styleUrls: ['./candidate-list.page.scss'],
})
export class CandidateListPage {
  filters = {
    lastActive: null,
    location: '',
    qualification: '',
    english: '',
    skills: '',
    experience: null,
  };

  candidates:any[] = [
    {
      name: 'Aarushi Thakur',
      age: 23,
      gender: 'Female',
      education: 'Post Graduate (M.Sc.)',
      experience: 'Fresher',
      skills: 'Business development',
      address: 'Himachal Pradesh, Hamirpur',
      english: 'Fluent',
      joined: 113,
    },
    {
      name: 'Aashi Pathak',
      age: 21,
      gender: 'Female',
      education: 'Post Graduate (M.A.)',
      experience: 'Fresher',
      skills: 'Tele Calling',
      address: 'Haryana, Ambala',
      english: 'Fluent',
      joined: 113,
    },
    {
      name: 'Abhishek Mishra',
      age: 26,
      gender: 'Male',
      education: 'Diploma (Computer Science)',
      experience: '8 years',
      skills: 'Business development, Marketing, Field sales',
      address: 'Delhi, New Delhi',
      english: 'Fluent',
      joined: 112,
    }
  ];
filteredCandidates :any []=[];
  displayedCandidates :any[]=[];

  // Pagination
  currentPage = 1;
  pageSize = 5;
  totalPages = 1;

  ngOnInit() {
    this.applyFilters();
  }

  applyFilters() {
    this.filteredCandidates = this.candidates.filter(candidate => {
      return (
        (!this.filters.location || candidate.address.toLowerCase().includes(this.filters.location.toLowerCase())) &&
        (!this.filters.qualification || candidate.education.toLowerCase().includes(this.filters.qualification.toLowerCase())) &&
        (!this.filters.skills || candidate.skills.toLowerCase().includes(this.filters.skills.toLowerCase())) &&
        (!this.filters.english || candidate.english.toLowerCase().includes(this.filters.english.toLowerCase()))
      );
    });

    this.totalPages = Math.ceil(this.filteredCandidates.length / this.pageSize);
    this.currentPage = 1;
    this.paginate();
  }

  paginate() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.displayedCandidates = this.filteredCandidates.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginate();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginate();
    }
  }

  resetFilters() {
    this.filters = {
      lastActive: null,
      location: '',
      qualification: '',
      english: '',
      skills: '',
      experience: null,
    };
    this.applyFilters();
  }
}
