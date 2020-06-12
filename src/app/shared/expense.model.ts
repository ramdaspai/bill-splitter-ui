import { Roommate } from './roommate.model';

export class Expense {
  id?: string;
  category: string;
  details: string;
  date: Date;
  totalAmount: number;
  transactionBy: string;
  transactedRoommate?: Roommate = {};
  lineItems?: LineItem[];

  constructor($category: string, $details: string, $date: Date, $totalAmount: number, $transactionBy: string, $lineItems?: LineItem[]) {
    this.category = $category;
    this.details = $details;
    this.date = $date;
    this.totalAmount = $totalAmount;
    this.transactionBy = $transactionBy;
    this.lineItems = $lineItems;
  }
}

export class LineItem {
  tId?: string;
  id: string;
  name: string;
  amount: number;

  constructor(id: string, name: string, amount: number) {
    this.id = id;
    this.name = name;
    this.amount = amount;
  }
}
