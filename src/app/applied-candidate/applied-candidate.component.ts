import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-applied-candidate',
  standalone:true,
  imports:[IonicModule,CommonModule],
  templateUrl: './applied-candidate.component.html',
  styleUrls: ['./applied-candidate.component.scss'],
})
export class AppliedCandidateComponent  implements OnInit {
   @Input() jobId!:number;
   canData:any;
  itemsPerPage = 10;
  currentPage = 1;
  // searchTerm = '';
  constructor(private modalCtrl: ModalController, private apiService: ApiService) { }

  employer_id!:number;
 user_id!:number;
limit!:number;
page!:number;
ngOnInit() {
  // const storedUser=localStorage.getItem('userId');
  // this.employer_id=Number(storedUser);
  this.employer_id = 96// Set actual value
  this.page = 1;
  this.limit = 10;

  this.apiService.appliedCandidates({}, this.employer_id, this.page, this.limit,this.jobId).subscribe((res: any) => {
    if (res.status==="success") {
      this.canData = res.data ;

      console.log('Jobs:', this.canData);
    }
    else{
      this.dismiss();
    }
  });
}
 dismiss() {
    this.modalCtrl.dismiss();
  }
  get filteredCandidates(){
  return this.canData;
}
  paginatedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredCandidates.slice(start, start + this.itemsPerPage);
  }
totalPages() {
    return Math.ceil(this.filteredCandidates.length / this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages()) this.currentPage++;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }
}
