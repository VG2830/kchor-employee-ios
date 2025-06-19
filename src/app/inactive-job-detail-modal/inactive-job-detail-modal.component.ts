import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-inactive-job-detail-modal',
  standalone:true,
  imports:[IonicModule,CommonModule],
  templateUrl: './inactive-job-detail-modal.component.html',
  styleUrls: ['./inactive-job-detail-modal.component.scss'],
})
export class InactiveJobDetailModalComponent  implements OnInit {
   @Input() userId!: number;
   @Input() jobId!:number;
jobData:any;
  loading = true;

    constructor(private modalCtrl: ModalController, private apiService: ApiService) {}
  
  ngOnInit() {
     this.apiService.employer_inactive_job_detail({},this.userId,this.jobId).subscribe({
      next: (res) => {
        this.jobData = res.data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        alert('Failed to load data');
        this.dismiss();
      },
    });
  }
dismiss() {
    this.modalCtrl.dismiss();
  }
  activeButton: string = 'description';  // Default active button

  setActiveButton(button: string) {
    this.activeButton = button;
  }
}
