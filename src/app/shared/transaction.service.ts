import { Payment } from './payment.model';
import { Observable } from 'rxjs';
import { Expense } from './expense.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class TransactionService {

    constructor(private http: HttpClient) {}

    addTransaction(expense: Expense): Observable<any> {
        // console.log('expense: ' + JSON.stringify(expense));
        return this.http.post('http://localhost:8080/api/expense/creation', expense);
    }

    getReceivables(transactionBy: string) {
      return this.http.get<Payment[]>(`http://localhost:8080/api/expenses/receivables/${transactionBy}`)
                .toPromise()
                .then(res => {
                  console.log(res);
                  return res;
                });
    }

    getPayables(transactionBy: string) {
      return this.http.get<Payment[]>(`http://localhost:8080/api/expenses/payables/${transactionBy}`)
                .toPromise()
                .then(res => {
                  console.log(res);
                  return res;
                });
    }

    getUserExpenses(userId: string) {
      return this.http.get<Expense[]>(`http://localhost:8080/api/expenses/${userId}`)
                .toPromise()
                .then(
                  (response) => {
                    // console.log(response);
                    return response as Expense[];
                  }
                );
    }
}
