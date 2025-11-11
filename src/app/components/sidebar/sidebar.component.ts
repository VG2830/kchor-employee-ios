// import { Component, OnInit } from '@angular/core';
// import { IonicModule } from '@ionic/angular';
// import { RouterLinkActive,RouterLink } from '@angular/router';

// @Component({
//   selector: 'app-sidebar',
//   templateUrl: './sidebar.component.html',
//   styleUrls: ['./sidebar.component.scss'],
//   imports:[IonicModule,RouterLinkActive,RouterLink]
// })
// export class SidebarComponent  implements OnInit {

//   constructor() { }

//   ngOnInit() {}

// }
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonicModule, MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-sidebar',
  standalone:true,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports:[IonicModule,CommonModule,RouterLink]
})
export class SidebarComponent {
  @Input() menuId: string = 'main-menu';
  @Input() contentId: string = 'main-content';
  @Input() menuItems: any[] = [];

  constructor(private menuCtrl: MenuController, private router: Router,private storage: Storage) {
      this.initStorage();
  }
 async initStorage() {
    await this.storage.create();
  }
  async closeMenu() {
    await this.menuCtrl.close(this.menuId);
  }

  onItemClick(item: any) {
    if (item.action === 'logout') {
      this.logout();
    } else {
      console.log('Menu item clicked:', item);
      this.closeMenu();
    }
  }

   async logout() {
    //  localStorage.clear();
    await this.storage.clear();
    console.log('Logging out...');

    this.router.navigate(['/login']);
    this.closeMenu();
  }
   isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }
}