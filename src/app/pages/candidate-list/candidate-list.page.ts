// // import { Component, OnInit } from '@angular/core';

// // @Component({
// //   selector: 'app-candidate-list',
// //   standalone:false,
// //   templateUrl: './candidate-list.page.html',
// //   styleUrls: ['./candidate-list.page.scss'],
// // })
// // export class CandidateListPage implements OnInit {

// //   constructor() { }

// //   ngOnInit() {
// //   }

// // }
// import { Component } from '@angular/core';
// import { ApiService } from 'src/app/services/api.service';

// @Component({
//   selector: 'app-candidate-list',
//   standalone:false,
//   templateUrl: './candidate-list.page.html',
//   styleUrls: ['./candidate-list.page.scss'],
// })
// export class CandidateListPage {
//     constructor(private apiService: ApiService) {}
  
//   filters = {
//     lastActive: null,
//     location: '',
//     qualification: '',
//     english: '',
//     skills: '',
//     experience: null,
//   };

//   // candidates:any[] = [
//   //   {
//   //     name: 'Aarushi Thakur',
//   //     age: 23,
//   //     gender: 'Female',
//   //     education: 'Post Graduate (M.Sc.)',
//   //     experience: 'Fresher',
//   //     skills: 'Business development',
//   //     address: 'Himachal Pradesh, Hamirpur',
//   //     english: 'Fluent',
//   //     joined: 113,
//   //   },
//   //   {
//   //     name: 'Aashi Pathak',
//   //     age: 21,
//   //     gender: 'Female',
//   //     education: 'Post Graduate (M.A.)',
//   //     experience: 'Fresher',
//   //     skills: 'Tele Calling',
//   //     address: 'Haryana, Ambala',
//   //     english: 'Fluent',
//   //     joined: 113,
//   //   },
//   //   {
//   //     name: 'Abhishek Mishra',
//   //     age: 26,
//   //     gender: 'Male',
//   //     education: 'Diploma (Computer Science)',
//   //     experience: '8 years',
//   //     skills: 'Business development, Marketing, Field sales',
//   //     address: 'Delhi, New Delhi',
//   //     english: 'Fluent',
//   //     joined: 112,
//   //   }
//   // ];
// candidates:any[]=[];
// filteredCandidates :any []=[];
//   displayedCandidates :any[]=[];

//   // Pagination
//   currentPage = 1;
//   pageSize = 5;
//   totalPages = 1;

//   ngOnInit() {


//   //    this.apiService.savedCandidates({}, this.employer_id, this.page, this.limit).subscribe((res: any) => {
//   //   if (res.status==="success") {
//   //     this.candidates = res.data ;

//   //     console.log('Jobs:', this.candidates);
//   //   }
//   // });
//     this.applyFilters();
//   }

//   applyFilters() {
//     const payload: any = {
//     page: this.currentPage,
//     limit: this.pageSize,
//     city_id: this.filters.location || null,
//     skills: this.filters.skills || null,
//     last_active: this.filters.lastActive ? 'this week' : null,
//     qualification_id: this.filters.qualification || null,
//     experience_min: this.filters.experience || null,
//     english_proficiency: this.filters.english || null,
//   };
//     this.filteredCandidates = this.candidates.filter(candidate => {
//       return (
//         (!this.filters.location || candidate.address.toLowerCase().includes(this.filters.location.toLowerCase())) &&
//         (!this.filters.qualification || candidate.education.toLowerCase().includes(this.filters.qualification.toLowerCase())) &&
//         (!this.filters.skills || candidate.skills.toLowerCase().includes(this.filters.skills.toLowerCase())) &&
//         (!this.filters.english || candidate.english.toLowerCase().includes(this.filters.english.toLowerCase()))
//       );
//     });
// // this.apiService.candidates(payload).subscribe((res: any) => {
// //     if (res.status === true) {
// //       this.candidates = res.data;
// //       this.totalPages = res.pagination?.total_pages || 1;
// //       this.currentPage = res.pagination?.current_page || 1;
// //       this.displayedCandidates = this.candidates;
// //     }
// //   });
//     this.totalPages = Math.ceil(this.filteredCandidates.length / this.pageSize);
//     this.currentPage = 1;
//     this.paginate();
//   }

//   // paginate() {
//   //   const start = (this.currentPage - 1) * this.pageSize;
//   //   const end = start + this.pageSize;
//   //   this.displayedCandidates = this.filteredCandidates.slice(start, end);
//   // }
// paginate() {
//   this.applyFilters(); // re-fetch server-side paginated results
// }
//   nextPage() {
//     if (this.currentPage < this.totalPages) {
//       this.currentPage++;
//       this.paginate();
//     }
//   }

//   prevPage() {
//     if (this.currentPage > 1) {
//       this.currentPage--;
//       this.paginate();
//     }
//   }

//   resetFilters() {
//     this.filters = {
//       lastActive: null,
//       location: '',
//       qualification: '',
//       english: '',
//       skills: '',
//       experience: null,
//     };
//     this.applyFilters();
//   }
// }
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { debounceTime } from 'rxjs/operators';
// import { ApiService } from 'src/app/services/api.service';

// @Component({
//   selector: 'app-candidate-list',
//   standalone:false,
//   templateUrl: './candidate-list.page.html',
//   styleUrls: ['./candidate-list.page.scss'],
  
// })
// export class CandidateListPage implements OnInit {
//   filterForm!: FormGroup ;
//   candidates: any[] = [];
//   displayedCandidates: any[] = [];
//   currentPage = 1;
//   pageSize = 10;
//   totalPages = 1;

//   constructor(private fb: FormBuilder, private apiService: ApiService) {}

//   ngOnInit() {
//     this.filterForm = this.fb.group({
//       lastActive: [''],
//       location: [''],
//       qualification: [''],
//       english: [''],
//       skills: [''],
//       experience: ['']
//     });

//     // Call API on any field change (with debounce)
//     this.filterForm.valueChanges.pipe(debounceTime(300)).subscribe(() => {
//       this.currentPage = 1;
//       this.applyFilters();
//     });

//     // Initial load
//     this.applyFilters();
//   }

//   applyFilters() {
//     const formValues = this.filterForm.value;

//     const payload = {
//       page: this.currentPage,
//       limit: this.pageSize,
//       city_id: formValues.location || null,
//       skills: formValues.skills || null,
//       last_active: formValues.lastActive || null,
//       qualification_id: formValues.qualification || null,
//       experience_min: formValues.experience || null,
//       english_proficiency: formValues.english || null,
//     };

//     this.apiService.candidates(payload).subscribe((res: any) => {
//       if (res.status) {
//         this.candidates = res.data || [];
//         this.totalPages = res.pagination?.total_pages || 1;
//         this.displayedCandidates = this.candidates;
//       }
//     });
//   }

//   nextPage() {
//     if (this.currentPage < this.totalPages) {
//       this.currentPage++;
//       this.applyFilters();
//     }
//   }

//   prevPage() {
//     if (this.currentPage > 1) {
//       this.currentPage--;
//       this.applyFilters();
//     }
//   }

//   resetFilters() {
//     this.filterForm.reset();
//     this.currentPage = 1;
//     this.applyFilters();
//   }
// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-candidate-list',
  standalone:false,
  templateUrl: './candidate-list.page.html',
  styleUrls: ['./candidate-list.page.scss'],
})
export class CandidateListPage implements OnInit {
  filterForm!: FormGroup;
  candidates: any[] = [];
  displayedCandidates: any[] = [];
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit() {
    this.filterForm = this.fb.group({
      lastActive: [''],
      location: [''],
      qualification: [''],
      english: [''],
      skills: [''],
      experience: ['']
    });

    // Trigger filter every time user changes any value
    this.filterForm.valueChanges.pipe(debounceTime(300)).subscribe(() => {
      this.currentPage = 1;
      this.applyFilters();
    });

    this.applyFilters(); // Initial load
  }

  applyFilters() {
    const formValues = this.filterForm.value;

    const payload = {
      page: this.currentPage,
      limit: this.pageSize,
      city_id: formValues.location || null,
      skills: formValues.skills || null,
      last_active: formValues.lastActive || null,
      qualification_id: formValues.qualification || null,
      experience_min: formValues.experience || null,
      english_proficiency: formValues.english || null,
    };

    this.apiService.candidates(payload).subscribe((res: any) => {
      if (res.status) {
        this.candidates = res.data || [];
        this.totalPages = res.pagination?.total_pages || 1;
        this.displayedCandidates = this.candidates;
      }
    });
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.applyFilters();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.applyFilters();
    }
  }

  resetFilters() {
    this.filterForm.reset();
    this.currentPage = 1;
    this.applyFilters();
  }
}
