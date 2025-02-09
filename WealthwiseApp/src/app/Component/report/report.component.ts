import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType , ChartData ,ChartConfiguration } from 'chart.js';
import { ExpenseService } from 'src/app/Service/Expense/expense.service';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent  implements OnInit{
  // Bar Chart Configuration
  // public barChartOptions: ChartConfiguration['options'] = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       display: true,
  //       position: 'top'
  //     }
  //   },
  //   scales: {
  //     x: {},
  //     y: {
  //       beginAtZero: true
  //     }
  //   }
  // };
  // public barChartLabels: string[] = ['January', 'February', 'March', 'April', 'May', 'June'];
  // public barChartData: ChartConfiguration['data'] = {
  //   labels: this.barChartLabels,
  //   datasets: [
  //     { data: [12000, 15000, 8000, 18000, 20000, 15000], label: 'Revenue' }
  //   ]
  // };
  // public barChartType: ChartType = 'bar';

  // Pie Chart Configuration
  // public pieChartOptions: ChartConfiguration['options'] = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       display: true,
  //       position: 'top'
  //     }
  //   }
  // };
  // public pieChartLabels: string[] = ['Sales', 'Marketing', 'Development', 'HR', 'Finance'];
  // public pieChartData: ChartConfiguration['data'] = {
  //   labels: this.pieChartLabels,
  //   datasets: [
  //     {
  //       data: [35, 25, 20, 15, 5],
  //       backgroundColor: ['#007bff', '#28a745', '#dc3545', '#ffc107', '#17a2b8']
  //     }
  //   ]
  // };
  // public pieChartType: ChartType = 'pie';
  
  // public pieChartLabels: string[] = [];
  // public pieChartData: ChartData<'pie'> = {
  //   labels: [],
  //   datasets: [{ data: [], backgroundColor: [] }]
  // };
  // public pieChartType: 'pie' = 'pie';  // Explicit type as 'pie'
  // public pieChartOptions: ChartOptions<'pie'> = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: 'top'
  //     }
  //   }
  // };

  // constructor(private reportService: ExpenseService) {}

  // ngOnInit(): void {
  //   this.fetchPieChartData();
  // }

  // fetchPieChartData(): void {
  //   this.reportService.getChartData().subscribe(data => {
  //     this.pieChartLabels = data.map(item => item.label);
  //     this.pieChartData = {
  //       labels: this.pieChartLabels,
  //       datasets: [
  //         {
  //           data: data.map(item => item.value),
  //           backgroundColor: data.map(item => item.color)
  //         }
  //       ]
  //     };
  //   });
  // }

  constructor (private reportService : ExpenseService) {}

  public barChartData: ChartData<'bar'> = { labels: [], datasets: [{ data: [], backgroundColor: [] }] };
  public barChartType: ChartType = 'bar';
  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
         display: true,
         position: 'bottom',  // Legend position at the bottom
      }
  }
  };

  public pieChartData: ChartData<'pie'> = { labels: [], datasets: [{ data: [], backgroundColor: [] }] };
  public pieChartType: ChartType = 'pie';
  public pieChartOptions: ChartOptions = {
    responsive: false,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'right',  // Legend aligned on the right
    }
  }
  };

  public stats: { label: string; value: number }[] = [];

  ngOnInit(): void {
    this.reportService.getChartData().subscribe(data => {
      const labels = data.map(item => item.label);
      const values = data.map(item => item.value);
      const colors = data.map(item => item.color);

      // Update bar chart
      this.barChartData = {
        labels: labels,
        datasets: [{ data: values, backgroundColor: colors }]
      };

      // Update pie chart
      this.pieChartData = {
        labels: labels,
        datasets: [{ data: values, backgroundColor: colors }]
      };

      // Update stats section
      this.stats = data.map(item => ({ label: item.label, value: item.value }));
    });
  }


}
