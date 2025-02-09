import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable  , of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private apiUrl = 'https://api.example.com/expenses';  // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getExpenses(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addExpense(expense: any): Observable<any> {
    return this.http.post(this.apiUrl, expense);
  }

  updateExpense(id: string, expense: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, expense);
  }

  deleteExpense(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  private ApiUrl = 'http://localhost:3000/your-endpoint'; // Replace with your API endpoint


  getChartData(): Observable<any[]> {
    const dummyData = [
      { label: 'Sales', value: 35, color: '#007bff' },      // Blue
      { label: 'Marketing', value: 25, color: '#28a745' }, // Green
      { label: 'Development', value: 20, color: '#dc3545' }, // Red
      { label: 'HR', value: 15, color: '#ffc107' },        // Yellow
      { label: 'Finance', value: 5, color: '#17a2b8' }     // Teal
    ];

    // Simulating an API call with `of()` from RxJS to return dummy data
    return of(dummyData);
  }

}
