import { Payment } from '../shared/payment.model';
import * as _ from 'lodash';
import { MessageService } from 'primeng/api';
import { Roommate } from './../shared/roommate.model';
import { RoommateService } from './../shared/roommate.service';
import { TransactionService } from './../shared/transaction.service';
import { Expense } from '../shared/expense.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [MessageService],
  styles: [`
    .loading-text {
        display: block;
        background-color: #f1f1f1;
        min-height: 19px;
        animation: pulse 1s infinite ease-in-out;
        text-indent: -99999px;
        overflow: hidden;
    }
  `]
})
export class DashboardComponent implements OnInit {

  phone: string;
  userOwes = 0;
  owesUser = 0;
  currentUser: Roommate;
  currentUserExpenses: Expense[];

  roomMatesIOwe: Payment[] = [];
  selectedRoommateIOwe: Payment;

  roomMatesOweMe: Payment[] = [];
  selectedRoommateOweMe: Payment;

  constructor(private transactionService: TransactionService,
              private roommateService: RoommateService,
              private messageService: MessageService,
              public router: Router) { }

  ngOnInit() {
  }

  onRowSelect(event) {
  }

  async searchUserByPhone() {
    await this.roommateService.searchByPhone(this.phone).then(roommate => this.currentUser = roommate);
    if (this.currentUser) {
      await this.transactionService.getUserExpenses(this.currentUser.id)
        .then(expenses => this.currentUserExpenses = expenses);
      await this.calculateBalances();
    } else {
      this.messageService.add({
        severity: 'warn', summary: 'Error',
        detail: 'User not found. Please enter a valid number.'
      });
    }
  }

  async calculateBalances() {
    await this.transactionService.getReceivables(this.currentUser.id).then(p => this.roomMatesOweMe = p);
    await this.transactionService.getPayables(this.currentUser.id).then(p => this.roomMatesIOwe = p);

    this.owesUser = 0;
    this.roomMatesOweMe.forEach(p => {
      this.owesUser = p.amount + this.owesUser;
    });

    this.userOwes = 0;
    this.roomMatesIOwe.forEach(p => {
      this.userOwes = p.amount + this.userOwes;
    });

    console.log('otherShare: ' + this.owesUser);
    console.log('userShare: ' + this.userOwes);
    console.log(this.roomMatesIOwe);
    console.log(this.roomMatesOweMe);
  }



  showDetails() {
    this.router.navigate(['/usertransactions']);
  }
}
