import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
// import lottie from 'lottie-web';

@Component({
  standalone:true,
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
  imports: [CommonModule, IonicModule] 
})
export class SplashScreenPage implements OnInit {
userType:string='';
  constructor(private router: Router) { }

  ngOnInit() {
  //  this.initial_nav();
  }

  ionViewWillEnter() {
   this.initial_nav();

  }

  initial_nav(){
     setTimeout(() => {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      // if (isLoggedIn) {
      //   this.router.navigate(['/employer-plan']);  //change krna h login its for trail 
       
      // } else {
      //   this.router.navigate(['/login']);
        
      // }
      if (isLoggedIn) {
      const userType=localStorage.getItem('type_Of_User');
       const navigationExtras: NavigationExtras = {
            state: {
            
            userType:this.userType
            }
          };
      console.log(userType);
      if(userType==="existing") {

       this.router.navigate(['/employer-plan'],navigationExtras); 
      }
      else{
        this.router.navigate(['/basic-details-page']);
      }
    } else {
      this.router.navigate(['/login']);
      // this.router.navigate(['/reg-aboutme']);  
    }
    }, 3000);
    
  }




  navigateToAppropriateRoute() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      const userType=localStorage.getItem('type_Of_User');
       const navigationExtras: NavigationExtras = {
            state: {
            
            userType:this.userType
            }
          };
      console.log(userType);
      if(userType==="existing") {

       this.router.navigate(['/employer-plan'],navigationExtras); 
      }
      else{
        this.router.navigate(['/basic-details-page']);
      }
    } else {
      this.router.navigate(['/login']);
      // this.router.navigate(['/reg-aboutme']);  
    }
  }

}
