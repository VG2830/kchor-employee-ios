import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { CheckoutModalPage } from 'src/app/checkout-modal/checkout-modal.page';
import { ApiService } from 'src/app/services/api.service';

import { PlanCardComponent } from 'src/app/components/plan-card/plan-card.component';
@Component({
  selector: 'app-employer-plan',
  
  templateUrl: './employer-plan.page.html',
  styleUrls: ['./employer-plan.page.scss'],
  standalone: false,

})
export class EmployerPlanPage implements OnInit {
 
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
//     
//     {
//       title: '7 Years PLAN',
//       price: 18999,
//        des:"Unlimited Candidate Responses",
//       duration: '7 years',
//       unlocks: 9000,
//       jobs: 600,
//       boosts: 90,
//     }
//    ];
         plans:any[]=[];

  constructor(private modalCtrl: ModalController,private apiService: ApiService) { }

  async openCheckoutModal(plan: any) {
    const modal = await this.modalCtrl.create({
      component: CheckoutModalPage,
      componentProps: { plan },
    });
    await modal.present();
  }

  ngOnInit() {
    this.apiService.getEmployerPlans().subscribe((res: any) => {
      if (res.status === true) {
        this.plans = res.data;
     
    }
      });
  }


}