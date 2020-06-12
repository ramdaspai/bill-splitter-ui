import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {

  items: MenuItem[];

  constructor() { }

  ngOnInit() {
      this.items = [
          { label: 'Home', routerLink: '/dashboard' },
          { label: 'My Roommates', routerLink: '/myroommates' },
          { label: 'Add New Transaction', routerLink: '/addtransaction' }
      ];
  }
}
