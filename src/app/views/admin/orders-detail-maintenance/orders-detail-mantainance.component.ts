import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrdersDetailModel } from 'src/app/shared/models/orders-detail-model';
import { OrderDetailService } from 'src/app/shared/services/orders-detail.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-orders-detail-mantainance',
  templateUrl: './orders-detail-mantainance.component.html',
  styleUrls: ['./orders-detail-mantainance.component.scss']
})
export class OrderDetailMantainanceComponent implements OnInit {
  
  searchControl: UntypedFormControl = new UntypedFormControl();
  orderDetail: Array<OrdersDetailModel>;
  orderDetailFiltered: Array<OrdersDetailModel>;
  selectedDetail: OrdersDetailModel;
  editDetailForm: FormGroup;

  constructor(
    private OrderDetailService: OrderDetailService,
    private modalService: NgbModal, 
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.updateOrderDetail();
    this.searchControl.valueChanges
    .pipe(debounceTime(200))
    .subscribe(value => {
      this.filterData(value);
    });
  }

  updateOrderDetail(){
    this.OrderDetailService.GetAllOrderDetail().subscribe({
      next: (resp) => {
        this.orderDetail =  [...resp];
        this.orderDetailFiltered = resp;
      }
    });
  }

  filterData(val) {
    if (val) {
      val = val.toLowerCase();
    } else {
      return this.orderDetailFiltered = [...this.orderDetail];
    }

    const columns = Object.keys(this.orderDetail[0]);
    if (!columns.length) {
      return;
    }

    const rows = this.orderDetail.filter(function(d) {
      for (let i = 0; i <= columns.length; i++) {
        const column = columns[i];
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });
    this.orderDetailFiltered = rows;
  }

  DeleteOrderDetail(content, DetailId: number){
    this.selectedDetail = this.orderDetail.find(s => s.idOrder == DetailId);
    this.modalService.open(content, 
      { 
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      }).result.then((result) => {
        if(result){
          this.OrderDetailService.DeleteOrderDetail(DetailId).subscribe({next: (resp) => {
            if(resp){
              this.updateOrderDetail();
            }
          }})
        }
      });
  }

  EditOrderDetail(content, DetailId: number){
    this.selectedDetail = this.orderDetail.find(s => s.idOrder == DetailId);
    this.editDetailForm = this._formBuilder.group({
      idCustomer: [this.selectedDetail.idCustomer],
      idProvider: [this.selectedDetail.idProvider],
      line: [this.selectedDetail.line],
      idProduct: [this.selectedDetail.idProduct],
      price: [this.selectedDetail.price],
      amount: [this.selectedDetail.amount],
      idStatus: [this.selectedDetail.idStatus]
    });

    let orderDetailToUpdate = {... this.selectedDetail}

    this.modalService.open(content, 
      { 
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      }).result.then((result) => {
        if(result){
          orderDetailToUpdate.idCustomer = this.editDetailForm.value?.idCustomer;
          orderDetailToUpdate.idProvider = this.editDetailForm.value?.idProvider;
          orderDetailToUpdate.line = this.editDetailForm.value?.line;
          orderDetailToUpdate.idProduct = this.editDetailForm.value?.idProduct;
          orderDetailToUpdate.price = this.editDetailForm.value?.price;
          orderDetailToUpdate.amount = this.editDetailForm.value?.amount;
          orderDetailToUpdate.idStatus = this.editDetailForm.value?.idStatus;
          this.OrderDetailService.UpdateOrderDetail(orderDetailToUpdate).subscribe({next: (resp) => {
            if(resp){
              this.updateOrderDetail();
            }
          }})
        }
      });
  }
}
