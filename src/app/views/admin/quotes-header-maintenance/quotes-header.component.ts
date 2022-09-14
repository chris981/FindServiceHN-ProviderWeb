import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuotesHeaderModel } from 'src/app/shared/models/quotes-header-model';
import { QuotesHeaderService } from 'src/app/shared/services/quotes-header.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-quotes-header',
  templateUrl: './quotes-header.component.html',
  styleUrls: ['./quotes-header.component.scss']
})
export class QuotesHeaderComponent implements OnInit {

  searchControl: UntypedFormControl = new UntypedFormControl();
  quotesHeader: Array<QuotesHeaderModel>;
  quotesHeaderFiltered: Array<QuotesHeaderModel>;
  selectedQuotesHeader: QuotesHeaderModel;
  editQuotesHeaderForm: FormGroup;

  constructor(
    private quotesHeaderService: QuotesHeaderService,
    private modalService: NgbModal, 
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.updateQuotesHeader();
    this.searchControl.valueChanges
    .pipe(debounceTime(200))
    .subscribe(value => {
      this.filterData(value);
    });
  }

  updateQuotesHeader(){
    this.quotesHeaderService.GetAllQuotesHeader().subscribe({
      next: (resp) => {
        this.quotesHeader =  [...resp];
        this.quotesHeaderFiltered = resp;
      }
    });
  }

  filterData(val) {
    if (val) {
      val = val.toLowerCase();
    } else {
      return this.quotesHeaderFiltered = [...this.quotesHeader];
    }

    const columns = Object.keys(this.quotesHeader[0]);
    if (!columns.length) {
      return;
    }

    const rows = this.quotesHeader.filter(function(d) {
      for (let i = 0; i <= columns.length; i++) {
        const column = columns[i];
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });
    this.quotesHeaderFiltered = rows;
  }

  DeleteQuotesHeader(content, QuoteHeaderid: number){
    this.selectedQuotesHeader = this.quotesHeader.find(s => s.idQuoteHeader == QuoteHeaderid);
    this.modalService.open(content, 
      { 
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      }).result.then((result) => {
        if(result){
          this.quotesHeaderService.DeleteQuotesHeader(QuoteHeaderid).subscribe({next: (resp) => {
            if(resp){
              this.updateQuotesHeader();
            }
          }})
        }
      });
  }

  EditQuotesHeader(content, QuoteHeaderid: number){
    this.selectedQuotesHeader = this.quotesHeader.find(s => s.idQuoteHeader == QuoteHeaderid);
    this.editQuotesHeaderForm = this._formBuilder.group({
      idQuoteHeader: [this.selectedQuotesHeader.idQuoteHeader],
      idQuoteDetail: [this.selectedQuotesHeader.idQuoteDetail],
      idCustomer: [this.selectedQuotesHeader.idCustomer],
      idProvider: [this.selectedQuotesHeader.idProvider],
      idClientAddres: [this.selectedQuotesHeader.idClientAddres],
      description: [this.selectedQuotesHeader.description],
      idCategory: [this.selectedQuotesHeader.idCategory],
      idSubcategory: [this.selectedQuotesHeader.idSubcategory],
      creationDate: [this.selectedQuotesHeader.creationDate],
      assigmentDate: [this.selectedQuotesHeader.assigmentDate],
      idStatus: [this.selectedQuotesHeader.idStatus],
      customerObservation: [this.selectedQuotesHeader.customerObservation],
      providerObservation: [this.selectedQuotesHeader.providerObservation],
      idStatusCreationDate: [this.selectedQuotesHeader.idStatusCreationDate],
    });

    let QuotesHeaderToUpdate = {... this.selectedQuotesHeader}

    this.modalService.open(content, 
      { 
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      }).result.then((result) => {
        if(result){
          QuotesHeaderToUpdate.idQuoteDetail = this.editQuotesHeaderForm.value?.idQuoteDetail;
          QuotesHeaderToUpdate.idCustomer = this.editQuotesHeaderForm.value?.idCustomer;
          QuotesHeaderToUpdate.idProvider = this.editQuotesHeaderForm.value?.idProvider;
          QuotesHeaderToUpdate.idClientAddres = this.editQuotesHeaderForm.value?.idClientAddres;
          QuotesHeaderToUpdate.description = this.editQuotesHeaderForm.value?.description;
          QuotesHeaderToUpdate.idCategory = this.editQuotesHeaderForm.value?.idCategory;
          QuotesHeaderToUpdate.idSubcategory = this.editQuotesHeaderForm.value?.idSubcategory;
          QuotesHeaderToUpdate.creationDate = this.editQuotesHeaderForm.value?.creationDate;
          QuotesHeaderToUpdate.assigmentDate = this.editQuotesHeaderForm.value?.assigmentDate;
          QuotesHeaderToUpdate.idStatus = this.editQuotesHeaderForm.value?.idStatus;
          QuotesHeaderToUpdate.customerObservation = this.editQuotesHeaderForm.value?.customerObservation;
          QuotesHeaderToUpdate.providerObservation = this.editQuotesHeaderForm.value?.providerObservation;
          QuotesHeaderToUpdate.idStatusCreationDate = this.editQuotesHeaderForm.value?.idStatusCreationDate;

          
          this.quotesHeaderService.UpdateQuotesHeader(QuotesHeaderToUpdate).subscribe({next: (resp) => {
            if(resp){
              this.updateQuotesHeader();
            }
          }})
        }
      });
  }
}
