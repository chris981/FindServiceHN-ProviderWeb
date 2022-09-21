import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrdersHeaderModel } from 'src/app/shared/models/orders-header-model';
import { OrderHeaderService } from 'src/app/shared/services/orders-header.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-orders-header-mantainance',
  templateUrl: './orders-header-mantainance.component.html',
  styleUrls: ['./orders-header-mantainance.component.scss']
})
export class OrderHeaderMantainanceComponent implements OnInit {
  
  searchControl: UntypedFormControl = new UntypedFormControl();
  orderHeader: Array<OrdersHeaderModel>;
  orderHeaderFiltered: Array<OrdersHeaderModel>;
  selectedHeader: OrdersHeaderModel;
  editHeaderForm: FormGroup;
  createOrderHeaderForm: FormGroup;

  constructor(
    private OrderHeaderService: OrderHeaderService,
    private modalService: NgbModal, 
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.updateOrderHeader();
    this.searchControl.valueChanges
    .pipe(debounceTime(200))
    .subscribe(value => {
      this.filterData(value);
    });
  }

  updateOrderHeader(){
    this.OrderHeaderService.GetAllOrderHeader().subscribe({
      next: (resp) => {
        this.orderHeader =  [...resp];
        this.orderHeaderFiltered = resp;
      }
    });
  }

  filterData(val) {
    if (val) {
      val = val.toLowerCase();
    } else {
      return this.orderHeaderFiltered = [...this.orderHeader];
    }

    const columns = Object.keys(this.orderHeader[0]);
    if (!columns.length) {
      return;
    }

    const rows = this.orderHeader.filter(function(d) {
      for (let i = 0; i <= columns.length; i++) {
        const column = columns[i];
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });
    this.orderHeaderFiltered = rows;
  }

  DeleteOrderHeader(content, HeaderId: number){
    this.selectedHeader = this.orderHeader.find(s => s.idOrder == HeaderId);
    this.modalService.open(content, 
      { 
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      }).result.then((result) => {
        if(result){
          this.OrderHeaderService.DeleteOrderHeader(HeaderId).subscribe({next: (resp) => {
            if(resp){
              this.updateOrderHeader();
            }
          }})
        }
      });
  }

  CreateOrderHeader(content){

    this.createOrderHeaderForm = this._formBuilder.group({
      idCustomer: null,
      idProvider: null,
      idClientAddress: null,
      description: null,
      idCategory: null,
      idSubCategory: null,
      creationDate: null,
      executionDate: null,
      closingDate: null,
      idStatus: null,
      satisfactionLevel: null,
      customerObservation: null
    });
    let orderHeaderToCreate = {...this.selectedHeader}
    this.modalService.open(content, 
      {
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      }).result.then((result) => {
        if(result){
          orderHeaderToCreate.idCustomer = this.createOrderHeaderForm.value?.idCustomer;
          orderHeaderToCreate.idProvider = this.createOrderHeaderForm.value?.idProvider;
          orderHeaderToCreate.idClientAddress = this.createOrderHeaderForm.value?.idClientAddress;
          orderHeaderToCreate.description = this.createOrderHeaderForm.value?.description;
          orderHeaderToCreate.idCategory = this.createOrderHeaderForm.value?.idCategory;
          orderHeaderToCreate.idSubCategory = this.createOrderHeaderForm.value?.idSubCategory;
          orderHeaderToCreate.creationDate = this.createOrderHeaderForm.value?.creationDate;
          orderHeaderToCreate.executionDate = this.createOrderHeaderForm.value?.executionDate;
          orderHeaderToCreate.closingDate = this.createOrderHeaderForm.value?.closingDate;
          orderHeaderToCreate.idStatus = this.createOrderHeaderForm.value?.idStatus;
          orderHeaderToCreate.satisfactionLevel = this.createOrderHeaderForm.value?.satisfactionLevel;
          orderHeaderToCreate.customerObservation = this.createOrderHeaderForm.value?.customerObservation;
          this.OrderHeaderService.CreateOrderHeader(orderHeaderToCreate).subscribe({next: (resp) => {
            if(resp){
              this.updateOrderHeader();
            }
          }})
        }
      })
  }

  EditOrderHeader(content, HeaderId: number){
    this.selectedHeader = this.orderHeader.find(s => s.idOrder == HeaderId);
    this.editHeaderForm = this._formBuilder.group({
      idCustomer: [this.selectedHeader.idCustomer],
      idProvider: [this.selectedHeader.idProvider],
      idClientAddress: [this.selectedHeader.idClientAddress],
      description: [this.selectedHeader.description],
      idCategory: [this.selectedHeader.idCategory],
      idSubCategory: [this.selectedHeader.idSubCategory],
      creationDate: [this.selectedHeader.creationDate],
      executionDate: [this.selectedHeader.executionDate],
      closingDate: [this.selectedHeader.closingDate],
      idStatus: [this.selectedHeader.idStatus],
      satisfactionLevel: [this.selectedHeader.satisfactionLevel],
      customerObservation: [this.selectedHeader.customerObservation]
    });

    let orderHeaderToUpdate = {... this.selectedHeader}

    this.modalService.open(content, 
      { 
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      }).result.then((result) => {
        if(result){
          orderHeaderToUpdate.idCustomer = this.editHeaderForm.value?.idCustomer;
          orderHeaderToUpdate.idProvider = this.editHeaderForm.value?.idProvider;
          orderHeaderToUpdate.idClientAddress = this.editHeaderForm.value?.idClientAddress;
          orderHeaderToUpdate.description = this.editHeaderForm.value?.description;
          orderHeaderToUpdate.idCategory = this.editHeaderForm.value?.idCategory;
          orderHeaderToUpdate.idSubCategory = this.editHeaderForm.value?.idSubCategory;
          orderHeaderToUpdate.creationDate = this.editHeaderForm.value?.creationDate;
          orderHeaderToUpdate.executionDate = this.editHeaderForm.value?.executionDate;
          orderHeaderToUpdate.closingDate = this.editHeaderForm.value?.closingDate;
          orderHeaderToUpdate.idStatus = this.editHeaderForm.value?.idStatus;
          orderHeaderToUpdate.satisfactionLevel = this.editHeaderForm.value?.satisfactionLevel;
          orderHeaderToUpdate.customerObservation = this.editHeaderForm.value?.customerObservation;
          this.OrderHeaderService.UpdateOrderHeader(orderHeaderToUpdate).subscribe({next: (resp) => {
            if(resp){
              this.updateOrderHeader();
            }
          }})
        }
      });
  }
}
