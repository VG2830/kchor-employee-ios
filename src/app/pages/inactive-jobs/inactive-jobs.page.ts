import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-inactive-jobs',
  standalone:false,
  templateUrl: './inactive-jobs.page.html',
  styleUrls: ['./inactive-jobs.page.scss'],
})
export class InactiveJobsPage {
  constructor(private actionSheetCtrl: ActionSheetController) {}

  entriesPerPage = 10;
  currentPage = 1;
  searchQuery = '';

  jobs = [
    {
      title: 'Frontend Developer',
      type: 'Full-Time',
      company: 'Tech Corp',
      location: 'Bangalore',
      applicants: 24,
      posted: '2025-06-10',
      logo: 'assets/icons/kaam-chor-logo-removebg.png',
    },
    {
      title: 'UI/UX Designer',
      type: 'Part-Time',
      company: 'DesignHub',
      location: 'Mumbai',
      applicants: 12,
      posted: '2025-06-05',
      logo: 'assets/icons/kaam-chor-logo-removebg.png',
    },
  ];

  get totalEntries() {
    return this.filteredJobs().length;
  }

  get startEntry() {
    return (this.currentPage - 1) * this.entriesPerPage + 1;
  }

  get endEntry() {
    return Math.min(this.startEntry + this.entriesPerPage - 1, this.totalEntries);
  }

  filteredJobs() {
    return this.jobs.filter(job =>
      job.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  async presentActionSheet(job: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: job.title,
      buttons: [
        {
          text: 'View',
          icon: 'eye-outline',
          handler: () => this.viewJob(job),
        },
        
        {
          text: 'Edit',
          icon: 'create-outline',
          handler: () => this.editJob(job),
        },
        
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  viewJob(job: any) {
    console.log('View:', job);
    // navigate to job details
  }

  
  editJob(job: any) {
    console.log('Edit:', job);
    // navigate to edit job page
  }

  
}
