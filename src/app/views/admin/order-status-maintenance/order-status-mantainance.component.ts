import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderStatus } from 'src/app/shared/models/order-status-model';
import { OrderStatusService } from 'src/app/shared/services/order-status.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-order-status-mantainance',
  templateUrl: './order-status-mantainance.component.html',
  styleUrls: ['./order-status-mantainance.component.scss']
})
export class OrderStatusMantainanceComponent implements OnInit {
  
  searchControl: UntypedFormControl = new UntypedFormControl();
  orderStatus: Array<OrderStatus>;
  orderStatusFiltered: Array<OrderStatus>;
  selectedStatus: OrderStatus;
  editStatusForm: FormGroup;

  constructor(
    private OrderStatusService: OrderStatusService,
    private modalService: NgbModal, 
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.updateOrderStatus();
    this.searchControl.valueChanges
    .pipe(debounceTime(200))
    .subscribe(value => {
      this.filterData(value);
    });
  }

  updateOrderStatus(){
    this.OrderStatusService.GetAllOrderStatus().subscribe({
      next: (resp) => {
        this.orderStatus =  [...resp];
        this.orderStatusFiltered = resp;
      }
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

  DeleteOrderStatus(content, StatusId: number){
    this.selectedStatus = this.orderStatus.find(s => s.idStatusOrder == StatusId);
    this.modalService.open(content, 
      { 
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      }).result.then((result) => {
        if(result){
          this.OrderStatusService.DeleteOrderStatus(StatusId).subscribe({next: (resp) => {
            if(resp){
              this.updateOrderStatus();
            }
          }})
        }
      });
  }

  EditOrderStatus(content, StatusId: number){
    this.selectedStatus = this.orderStatus.find(s => s.idStatusOrder == StatusId);
    this.editStatusForm = this._formBuilder.group({
      idStatus: [this.selectedStatus.idStatus],
      description: [this.selectedStatus.description]      
    });

    let orderStatusToUpdate = {... this.selectedStatus}

    this.modalService.open(content, 
      { 
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      }).result.then((result) => {
        if(result){
          orderStatusToUpdate.idStatus = this.editStatusForm.value?.idStatus;
          orderStatusToUpdate.description = this.editStatusForm.value?.description;
          this.OrderStatusService.UpdateOrderStatus(orderStatusToUpdate).subscribe({next: (resp) => {
            if(resp){
              this.updateOrderStatus();
            }
          }})
        }
      });
  }
}
