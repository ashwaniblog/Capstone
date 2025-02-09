import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder , Validators } from '@angular/forms';
import { ExpenseService } from 'src/app/Service/Expense/expense.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  expenseForm: FormGroup;
  expenses: any[] = [];
  isEditMode = false;
  editIndex: number | null = null;
  categoryOptions: string[] = ['Food', 'Transport', 'Shopping', 'Health', 'Entertainment', 'Utilities'];

  constructor(private fb: FormBuilder, private expenseService: ExpenseService) {
    this.expenseForm = this.fb.group({
      description: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      date: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchExpenses();
  }

  fetchExpenses(): void {
    this.expenseService.getExpenses().subscribe(
      (data) => {
        this.expenses = data;
      },
      (error) => {
        console.error('Failed to fetch expenses:', error);
      }
    );
  }

  addExpense(): void {
    const newExpense = this.expenseForm.value;
    if (!this.categoryOptions.includes(newExpense.category)) {
      this.categoryOptions.push(newExpense.category);
    }

    if (this.isEditMode && this.editIndex !== null) {
      const id = this.expenses[this.editIndex]._id;
      this.expenseService.updateExpense(id, newExpense).subscribe(
        (response) => {
          this.expenses[this.editIndex!] = response;
          this.resetForm();
        },
        (error) => console.error('Failed to update expense:', error)
      );
    } else {
      this.expenseService.addExpense(newExpense).subscribe(
        (response) => {
          this.expenses.push(response);
          this.resetForm();
        },
        (error) => console.error('Failed to add expense:', error)
      );
    }
  }

  editExpense(index: number): void {
    this.isEditMode = true;
    this.editIndex = index;
    const expense = this.expenses[index];
    this.expenseForm.setValue({
      description: expense.description,
      amount: expense.amount,
      date: expense.date,
      category: expense.category
    });
  }

  deleteExpense(index: number): void {
    const id = this.expenses[index]._id;
    this.expenseService.deleteExpense(id).subscribe(
      (response) => {
        this.expenses.splice(index, 1);
      },
      (error) => console.error('Failed to delete expense:', error)
    );
  }

  resetForm(): void {
    this.expenseForm.reset();
    this.isEditMode = false;
    this.editIndex = null;
  }
}
