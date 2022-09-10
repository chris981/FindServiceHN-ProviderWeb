import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { OrderStatus } from 'src/app/shared/models/order-status-model';
import { OrderStatusService } from 'src/app/shared/services/order-status.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-order-status-mantainance',
  templateUrl: './order-status-mantainance.component.html',
  styleUrls: ['./order-status-mantainance.component.scss']
})
export class OrderStatusMantainanceComponent implements OnInit {
  orderStatus: Array<OrderStatus>;
  orderStatusFiltered: Array<OrderStatus>;
  searchControl: UntypedFormControl = new UntypedFormControl();
  constructor(private orderStatusService: OrderStatusService) { }

  ngOnInit(): void {
    this.GetAllOrderStatuses();
    this.searchControl.valueChanges
    .pipe(debounceTime(200))
    .subscribe(value => {
      this.filterData(value);
    });
  }

  filterData(val) {
    if (val) {
      val = val.toLowerCase();
    } else {
      return this.orderStatusFiltered = [...this.orderStatus];
    }

    const columns = Object.keys(this.orderStatus[0]);
    if (!columns.length) {
      return;
    }

    const rows = this.orderStatus.filter(function(d) {
      for (let i = 0; i <= columns.length; i++) {
        const column = columns[i];
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });
    this.orderStatusFiltered = rows;
  }

  GetAllOrderStatuses(){
    this.orderStatusService.getOrderStatus()
      .subscribe({next: (resp) => {
        this.orderStatus = [...resp];
        this.orderStatusFiltered = resp;
      }});
  }

}