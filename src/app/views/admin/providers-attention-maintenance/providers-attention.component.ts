import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProviderAttentionModel } from 'src/app/shared/models/provider-attention-model';
import { ProvidersAttentionService } from 'src/app/shared/services/providers-attention.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-providers-attention',
  templateUrl: './providers-attention.component.html',
  styleUrls: ['./providers-attention.component.scss']
})
export class ProvidersAttentionComponent implements OnInit {

 
  searchControl: UntypedFormControl = new UntypedFormControl();
  providersAttention: Array<ProviderAttentionModel>;
  providersAttentionFiltered: Array<ProviderAttentionModel>;
  selectedprovidersAttention: ProviderAttentionModel;
  editprovidersAttentionForm: FormGroup;

  constructor(
    private providersAttentionService: ProvidersAttentionService,
    private modalService: NgbModal, 
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.updateProvidersAttention();
    this.searchControl.valueChanges
    .pipe(debounceTime(200))
    .subscribe(value => {
      this.filterData(value);
    });
  }

  updateProvidersAttention(){
    this.providersAttentionService.GetAllProviderAttention().subscribe({
      next: (resp) => {
        this.providersAttention =  [...resp];
        this.providersAttentionFiltered = resp;
      }
    });
  }

  filterData(val) {
    if (val) {
      val = val.toLowerCase();
    } else {
      return this.providersAttentionFiltered = [...this.providersAttention];
    }

    const columns = Object.keys(this.providersAttention[0]);
    if (!columns.length) {
      return;
    }

    const rows = this.providersAttention.filter(function(d) {
      for (let i = 0; i <= columns.length; i++) {
        const column = columns[i];
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });
    this.providersAttentionFiltered = rows;
  }

  DeleteProvidersAttention(content, ProviderAttentionid: number){
    this.selectedprovidersAttention = this.providersAttention.find(s => s.idProviderAttention == ProviderAttentionid);
    this.modalService.open(content, 
      { 
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      }).result.then((result) => {
        if(result){
          this.providersAttentionService.DeleteProviderAttention(ProviderAttentionid).subscribe({next: (resp) => {
            if(resp){
              this.updateProvidersAttention();
            }
          }})
        }
      });
  }

  EditProvidersAttention(content, ProviderAttentionid: number){
    this.selectedprovidersAttention = this.providersAttention.find(s => s.idProviderAttention == ProviderAttentionid);
    this.editprovidersAttentionForm = this._formBuilder.group({
      idProviderAttention: [this.selectedprovidersAttention.idProviderAttention],
      description: [this.selectedprovidersAttention.description],
      typeAttention: [this.selectedprovidersAttention.typeAttention],
      idStatus: [this.selectedprovidersAttention.idStatus],
      creationDate: [this.selectedprovidersAttention.creationDate]
    });

    let providersAttentionToUpdate = {... this.selectedprovidersAttention}

    this.modalService.open(content, 
      { 
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      }).result.then((result) => {
        if(result){
          providersAttentionToUpdate.description = this.editprovidersAttentionForm.value?.description;
          providersAttentionToUpdate.typeAttention = this.editprovidersAttentionForm.value?.typeAttention;
          providersAttentionToUpdate.idStatus = this.editprovidersAttentionForm.value?.idStatus;
          providersAttentionToUpdate.creationDate = this.editprovidersAttentionForm.value?.creationDate;
          this.providersAttentionService.UpdateProviderAttention(providersAttentionToUpdate).subscribe({next: (resp) => {
            if(resp){
              this.updateProvidersAttention();
            }
          }})
        }
      });
  }
}
