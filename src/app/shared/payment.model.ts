import { Roommate } from './roommate.model';

export class Payment {
  from: Roommate;
  to: Roommate;
  amount: number;
  transactions: string[];
}
