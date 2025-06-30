import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CheckoutModalPage } from 'src/app/checkout-modal/checkout-modal.page';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employer-plan',

  templateUrl: './employer-plan.page.html',
  styleUrls: ['./employer-plan.page.scss'],
  standalone: false,
})
export class EmployerPlanPage implements OnInit {
  userType: string | null = null;

  plans: any[] = [];

  constructor(
    private modalCtrl: ModalController,
    private apiService: ApiService,
    private router: Router
  ) {}

  async openCheckoutModal(plan: any) {
    const modal = await this.modalCtrl.create({
      component: CheckoutModalPage,
      componentProps: { plan },
    });
    await modal.present();
  }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.userType = navigation.extras.state['userType'];
    }
    this.userType=localStorage.getItem('type_Of_User');
  
    console.log("from local storage",this.userType);

    if (this.userType === 'existing') {
      this.apiService.getEmployerPlans().subscribe((res: any) => {
        if (res.status === true) {
          this.plans = res.data;
        }
      });
    }
  }
  logout() {
    // Step 1: Clear the user_id from localStorage
    localStorage.removeItem('user_id');

    // OR reset completely
    localStorage.clear(); // if you want to clear everything

    // Step 2: Navigate to the login page
    this.router.navigate(['/login']);
  }
}

// plans = [
//     {
//       title: '1 month PLAN',

//       price: 1999,
//       des:"Unlimited Candidate Responses",
//       duration: '1 month',
//       unlocks: 200,
//       jobs: 15,
//       boosts: 2,
//     },

//    ];
