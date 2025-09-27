// import { ModalController, NavParams } from '@ionic/angular';
// import { Component } from '@angular/core';
// import { IonicModule } from '@ionic/angular';
// @Component({
//   selector: 'app-checkout-modal',
//   templateUrl: './checkout-modal.page.html',
//   styleUrls: ['./checkout-modal.page.scss'],
//   imports:[IonicModule],
// })
// export class CheckoutModalPage {
//   plan: any;

//   constructor(private modalCtrl: ModalController, private navParams: NavParams) {
//     this.plan = this.navParams.get('plan');
//   }

//   dismiss() {
//     this.modalCtrl.dismiss();
//   }
// }
import { Component, Input, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-checkout-modal',
  standalone:true,
  templateUrl: './checkout-modal.page.html',
  styleUrls: ['./checkout-modal.page.scss'],
  imports:[IonicModule,ReactiveFormsModule,FormsModule,CommonModule]
})
export class CheckoutModalPage implements OnInit {
  plan: any;
   checkOutData:FormGroup;
    user_id!: number;
    number: string = '';
  address: string = '';
  name:string='';
  email:string='';
  constructor( private navParams: NavParams, 
    private modalCtrl: ModalController, 
    private fb: FormBuilder,
    private apiService: ApiService,
  ) 
  {
    this.plan = this.navParams.get('plan');

    this.checkOutData=this.fb.group({
      name:['',Validators.required],
      email:['',Validators.required],
      mobile:['',Validators.required],
      address:['',Validators.required]

    })
  }
 ngOnInit(){
   this.user_id = Number(localStorage.getItem('userId'));
   this.plan = this.navParams.get('plan');
   console.log(this.plan);
  }
  closeModal() {
    this.modalCtrl.dismiss();
  }
  onPayNow(){
     if (this.checkOutData.invalid) {
      this.checkOutData.markAllAsTouched();
      return;
    }
    const formData = {
      ...this.checkOutData.value,
      user_id: this.user_id,
    };
   this.apiService.submitCheckoutData(formData).subscribe((res: any) => {
        if (res.status === "success") {
        // console.log(res);

      var  planDuration=this.plan.duration;

      console.log(planDuration);
        this.apiService.orderCreate(planDuration).subscribe((res:any)=>{

        })
        }
      });
  }
 
}
