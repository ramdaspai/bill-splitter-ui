import { RoommateService } from './../../shared/roommate.service';
import { Expense, LineItem } from './../../shared/expense.model';
import { TransactionService } from '../../shared/transaction.service';
import { Roommate } from '../../shared/roommate.model';
import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-add',
  templateUrl: './transaction-add.component.html',
  styleUrls: ['./transaction-add.component.css'],
  providers: [MessageService]
})
export class TransactionAddComponent implements OnInit {

  // form fields
  selectedCategory: any;
  expenseDetails: string;
  transactionDate: Date;
  totalAmt: number;
  splitEqual = true;
  editFlow = false;
  expenseId: string;
  currentUserId = '5ed668fccc4add1e39be4869';

  dateTime = new Date(); // max date can't be more than current date
  submitted: boolean;
  categories: SelectItem[];
  roomMateNames: SelectItem[];

  roomMates1: Roommate[];
  roomMates2: Roommate[];
  finalRoomMates: Roommate[];
  clonedRoommate: { [s: string]: Roommate; } = {};

  constructor(private transactionService: TransactionService,
              private roommateService: RoommateService,
              private messageService: MessageService,
              private router: Router) {

    if (this.router.getCurrentNavigation().extras.state) {
      this.editFlow = true;
      const expense = this.router.getCurrentNavigation().extras.state.data.rowData;
      // console.log(expense);

      if (expense) {
        this.selectedCategory = { label: expense.category, value: expense.category };
        this.expenseDetails = expense.details;
        this.transactionDate = new Date(expense.date);
        this.totalAmt = expense.totalAmount;

        this.roomMates2 = [];

        expense.lineItems.forEach(element => {
            const roommate = new Roommate(element.name, null, null);
            roommate.id = element.id;
            roommate.amount = element.amount;
            this.roomMates2.push(roommate);
        });
        const isEqual = this.roomMates2.every((val, i, arr) => val.amount === arr[0].amount);
        if (expense.lineItems && isEqual) {
          this.splitEqual = true;
        } else {
          this.splitEqual = false;
        }
        if (this.roomMates2) {
          this.roomMates1 = _.cloneDeep(this.roomMates2);
          this.expenseId = expense.id;
        }
      }
    }
  }

  async ngOnInit() {
    if (!this.editFlow) {
      await this.roommateService.getRoommates().then(roomMates => this.roomMates1 = roomMates);
      await this.roommateService.getRoommates().then(roomMates => this.roomMates2 = roomMates);
    }
    this.buildForm();
    // console.log(this.roomMates2);
  }

  buildForm() {
    // Populate Category Dropdown values
    this.categories = [
      { label: 'Food', value: 'Food' },
      { label: 'Travel', value: 'Travel' },
      { label: 'Grocery', value: 'Grocery' }
    ];

    // Populate Roommates Dropdown values
    if (this.roomMates2 && this.roomMates2.length > 0) {
      this.roomMateNames = [];
      this.roomMates2.forEach(e => {
        this.roomMateNames.push({ label: e.name, value: e.name });
      });
    }
  }

  async onSubmit() {
    this.finalRoomMates = [];
    this.roomMates2.forEach(e => {
      if (e.id) {
        this.finalRoomMates.push(e);
      } else {
        const roommate = this.getRoommateByFind(e.name);
        if (roommate) {
          roommate.amount = e.amount;
          this.finalRoomMates.push(roommate);
        }
      }
    });
    // this.finalRoomMates.forEach(e => console.log('inside finalroommates: ' + e.amount + ' :: ' + e.id + ' :: ' + e.name));

    let errorMsg;
    if (this.validateForm()) {
      await this.transactionService.addTransaction(this.buildExpense())
        .subscribe(
          (response) => {
            return response;
          },
          (error) => {
            errorMsg = error.error.message;
          }
        );

      this.reset();
      if (!errorMsg) {
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Transaction saved successfully.' });
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMsg });
      }
    }
  }

  getRoommateByFind(name): Roommate {
    return this.roomMates1.find(x => x.name === name);
  }

  buildExpense() {
    const lineItem: LineItem[] = [];
    if (this.finalRoomMates && this.finalRoomMates.length > 0) {
      this.finalRoomMates.forEach(e => {
        let line;
        const equalShare = this.totalAmt / this.finalRoomMates.length;
        if (this.splitEqual) {
          line = new LineItem(e.id, e.name, equalShare);
        } else {
          line = new LineItem(e.id, e.name, e.amount);
        }
        lineItem.push(line);
      });
    }
    const expense = new Expense(this.selectedCategory.value, this.expenseDetails, this.transactionDate,
      this.totalAmt, this.currentUserId, lineItem);
    if (this.editFlow && this.expenseId) {
      expense.id = this.expenseId;
    }
    return expense;
  }

  reset() {
    this.selectedCategory = null;
    this.expenseDetails = null;
    this.totalAmt = null;
    this.transactionDate = null;
    this.splitEqual = true;
    this.editFlow = false;
    this.expenseId = null;
    this.ngOnInit();
  }

  validateForm(): boolean {
    if (this.roomMates2.length > this.roomMates1.length) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Cant have more rows than number of roommates.' });
      return false;
    }

    if (this.finalRoomMates && this.finalRoomMates.length > 0 && !this.splitEqual) {
      let calTotalAmt = 0;
      this.finalRoomMates.forEach(e => {
        calTotalAmt = calTotalAmt + e.amount;
        if (!e.amount) {
          this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Amount is mandatory when not split equally.' });
          return false;
        }
      });
      if (calTotalAmt !== this.totalAmt) {
        this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Amount split mismatch.' });
        return false;
      }
    }
    return true;
  }

  onRowEditDelete(index: number) {
    this.roomMates2.splice(index, 1);
    this.submitted = true;
  }

  newRow() {
    return { name: '', amount: '' };
  }

  isSubmit() {
    return this.selectedCategory && this.expenseDetails && this.transactionDate && this.totalAmt;
  }
}
