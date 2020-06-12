import { Roommate } from './../../shared/roommate.model';
import { RoommateService } from './../../shared/roommate.service';
import { Router } from '@angular/router';
import { Expense } from './../../shared/expense.model';
import { TransactionService } from './../../shared/transaction.service';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.css'],
  animations: [
    trigger('rowExpansionTrigger', [
        state('void', style({
            transform: 'translateX(-10%)',
            opacity: 0
        })),
        state('active', style({
            transform: 'translateX(0)',
            opacity: 1
        })),
        transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
  ])
]
})
export class TransactionDetailComponent implements OnInit {

  userExpenses: Expense[];
  cols: any[];
  currentUserId = '5ed668fccc4add1e39be4869';
  roomMates: Roommate[];

  constructor(private transactionService: TransactionService,
              private roommateService: RoommateService,
              private router: Router) { }

  async ngOnInit() {
    await this.roommateService.getRoommates().then(roomMates => this.roomMates = roomMates);
    await this.transactionService.getUserExpenses(this.currentUserId).then(expenses => this.userExpenses = expenses);
    this.userExpenses.forEach(e => {
      e.transactedRoommate = this.roomMates.filter(x => x.id === e.transactionBy)[0];
    });
    this.cols = [
      { field: 'transactionBy', header: 'Transaction By' },
      { field: 'category', header: 'Category' },
      { field: 'date', header: 'Transaction Date' },
      { field: 'totalAmount', header: 'Transaction Amount' },
      { field: 'actions', header: 'Actions' }
    ];
  }

  editTransaction(rowData) {
    // console.log(rowData);
    this.router.navigate(['/addtransaction'], {state: { data: {rowData}}});
  }
}
