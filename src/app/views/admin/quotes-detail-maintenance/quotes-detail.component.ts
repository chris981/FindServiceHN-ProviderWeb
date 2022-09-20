import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from 'rxjs/operators';
import { QuotesDetail } from 'src/app/shared/models/quotes-detail-model';
import { QuotesDetailService } from 'src/app/shared/services/quotes-detail.service';
@Component({
  selector: 'app-quotes-detail',
  templateUrl: './quotes-detail.component.html',
  styleUrls: ['./quotes-detail.component.scss']
})
export class QuotesDetailComponent implements OnInit {

  
  searchControl: UntypedFormControl = new UntypedFormControl();
  quotesDetail: Array<QuotesDetail>;
  quotesDetailFiltered: Array<QuotesDetail>;
  selectedQuotesDetail: QuotesDetail;
  editQuotesDetailForm: FormGroup;
  createQuotesDetailForm: FormGroup;

  constructor(
    private quotesDetailService: QuotesDetailService,
    private modalService: NgbModal, 
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.updateQuotesDetail();
    this.searchControl.valueChanges
    .pipe(debounceTime(200))
    .subscribe(value => {
      this.filterData(value);
    });
  }

  updateQuotesDetail(){
    this.quotesDetailService.GetAllQuotesDetail().subscribe({
      next: (resp) => {
        this.quotesDetail =  [...resp];
        this.quotesDetailFiltered = resp;
      }
    });
  }

  filterData(val) {
    if (val) {
      val = val.toLowerCase();
    } else {
      return this.quotesDetailFiltered = [...this.quotesDetail];
    }

    const columns = Object.keys(this.quotesDetail[0]);
    if (!columns.length) {
      return;
    }

    const rows = this.quotesDetail.filter(function(d) {
      for (let i = 0; i <= columns.length; i++) {
        const column = columns[i];
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });
    this.quotesDetailFiltered = rows;
  }

  DeleteQuotesDetail(content, QuoteDetailid: number){
    this.selectedQuotesDetail = this.quotesDetail.find(s => s.idQuoteDetail == QuoteDetailid);
    this.modalService.open(content, 
      { 
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      }).result.then((result) => {
        if(result){
          this.quotesDetailService.DeleteQuotesDetail(QuoteDetailid).subscribe({next: (resp) => {
            if(resp){
              this.updateQuotesDetail();
            }
          }})
        }
      });
  }

  EditQuotesDetail(content, QuoteDetailid: number){
    this.selectedQuotesDetail = this.quotesDetail.find(s => s.idQuoteDetail == QuoteDetailid);
    this.editQuotesDetailForm = this._formBuilder.group({
      idQuoteDetail: [this.selectedQuotesDetail.idQuoteDetail],
      idCustomer: [this.selectedQuotesDetail.idCustomer],
      idProvider: [this.selectedQuotesDetail.idProvider],
      line: [this.selectedQuotesDetail.line],
      idProduct: [this.selectedQuotesDetail.idProduct],
      price: [this.selectedQuotesDetail.price],
      amount: [this.selectedQuotesDetail.amount],
      iStatus: [this.selectedQuotesDetail.iStatus],
    });

    let quotesDetailToUpdate = {... this.selectedQuotesDetail}

    this.modalService.open(content, 
      { 
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      }).result.then((result) => {
        if(result){
          quotesDetailToUpdate.idCustomer = this.editQuotesDetailForm.value?.idCustomer;
          quotesDetailToUpdate.idProvider = this.editQuotesDetailForm.value?.idProvider;
          quotesDetailToUpdate.line = this.editQuotesDetailForm.value?.line;
          quotesDetailToUpdate.idProduct = this.editQuotesDetailForm.value?.idProduct;
          quotesDetailToUpdate.price = this.editQuotesDetailForm.value?.price;
          quotesDetailToUpdate.amount = this.editQuotesDetailForm.value?.amount;
          quotesDetailToUpdate.iStatus = this.editQuotesDetailForm.value?.iStatus;

          this.quotesDetailService.UpdateQuotesDetail(quotesDetailToUpdate).subscribe({next: (resp) => {
            if(resp){
              this.updateQuotesDetail();
            }
          }})
        }
      });
  }

  CreateQuotesDetail(content){

    this.createQuotesDetailForm = this._formBuilder.group({
      idCustomer: null,
      idProvider: null,
      line: null,
      idProduct: null,
      price: null,
      amount: null,
      iStatus: null
      
    });
    let quotesDetail = {...this.selectedQuotesDetail}
    this.modalService.open(content, 
      {
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      }).result.then((result) => {
        if(result){
          quotesDetail.idCustomer = this.createQuotesDetailForm.value?.idCustomer;
          quotesDetail.idProvider = this.createQuotesDetailForm.value?.idProvider;
          quotesDetail.line = this.createQuotesDetailForm.value?.line;
          quotesDetail.idProduct = this.createQuotesDetailForm.value?.idProduct;
          quotesDetail.price = this.createQuotesDetailForm.value?.price;
          quotesDetail.amount = this.createQuotesDetailForm.value?.amount;
          quotesDetail.iStatus = this.createQuotesDetailForm.value?.iStatus;
          
          this.quotesDetailService.CreateQuotesDetail(quotesDetail).subscribe({next: (resp) => {
            if(resp){
              this.updateQuotesDetail();
            }
          }})
        }
      })
  }

}
