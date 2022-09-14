import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrdersSatisfactionModel } from 'src/app/shared/models/orders-satisfaction-model';
import { OrderSatisfactionService } from 'src/app/shared/services/orders-satisfaction.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-orders-satisfaction-mantainance',
  templateUrl: './orders-satisfaction-mantainance.component.html',
  styleUrls: ['./orders-satisfaction-mantainance.component.scss']
})
export class OrderSatisfactionMantainanceComponent implements OnInit {
  
  searchControl: UntypedFormControl = new UntypedFormControl();
  orderSatisfaction: Array<OrdersSatisfactionModel>;
  orderSatisfactionFiltered: Array<OrdersSatisfactionModel>;
  selectedSatisfaction: OrdersSatisfactionModel;
  editSatisfactionForm: FormGroup;

  constructor(
    private OrderSatisfactionService: OrderSatisfactionService,
    private modalService: NgbModal, 
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.updateOrderSatisfaction();
    this.searchControl.valueChanges
    .pipe(debounceTime(200))
    .subscribe(value => {
      this.filterData(value);
    });
  }

  updateOrderSatisfaction(){
    this.OrderSatisfactionService.GetAllOrderSatisfaction().subscribe({
      next: (resp) => {
        this.orderSatisfaction =  [...resp];
        this.orderSatisfactionFiltered = resp;
      }
    });
  }

  filterData(val) {
    if (val) {
      val = val.toLowerCase();
    } else {
      return this.orderSatisfactionFiltered = [...this.orderSatisfaction];
    }

    const columns = Object.keys(this.orderSatisfaction[0]);
    if (!columns.length) {
      return;
    }

    const rows = this.orderSatisfaction.filter(function(d) {
      for (let i = 0; i <= columns.length; i++) {
        const column = columns[i];
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });
    this.orderSatisfactionFiltered = rows;
  }

  DeleteOrderSatisfaction(content, SatisfactionId: number){
    this.selectedSatisfaction = this.orderSatisfaction.find(s => s.idSatisfaction == SatisfactionId);
    this.modalService.open(content, 
      { 
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      }).result.then((result) => {
        if(result){
          this.OrderSatisfactionService.DeleteOrderSatisfaction(SatisfactionId).subscribe({next: (resp) => {
            if(resp){
              this.updateOrderSatisfaction();
            }
          }})
        }
      });
  }

  EditOrderSatisfaction(content, SatisfactionId: number){
    this.selectedSatisfaction = this.orderSatisfaction.find(s => s.idSatisfaction == SatisfactionId);
    this.editSatisfactionForm = this._formBuilder.group({
      valorization: [this.selectedSatisfaction.valorization],
      description: [this.selectedSatisfaction.description]
    });

    let orderSatisfactionToUpdate = {... this.selectedSatisfaction}

    this.modalService.open(content, 
      { 
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      }).result.then((result) => {
        if(result){
          orderSatisfactionToUpdate.valorization = this.editSatisfactionForm.value?.valorization;
          orderSatisfactionToUpdate.description = this.editSatisfactionForm.value?.description;
          this.OrderSatisfactionService.UpdateOrderSatisfaction(orderSatisfactionToUpdate).subscribe({next: (resp) => {
            if(resp){
              this.updateOrderSatisfaction();
            }
          }})
        }
      });
  }
}