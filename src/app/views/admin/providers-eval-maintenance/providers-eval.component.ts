import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from 'rxjs/operators';
import { ProviderEvalModel } from 'src/app/shared/models/provider-eval-model';
import { ProvidersEvalService } from 'src/app/shared/services/providers-eval.service';
@Component({
  selector: 'app-providers-eval',
  templateUrl: './providers-eval.component.html',
  styleUrls: ['./providers-eval.component.scss']
})
export class ProvidersEvalComponent implements OnInit {

  searchControl: UntypedFormControl = new UntypedFormControl();
  ProviderEval: Array<ProviderEvalModel>;
  ProviderEvalFiltered: Array<ProviderEvalModel>;
  selectedProviderEval: ProviderEvalModel;
  editProviderEvalForm: FormGroup;

  constructor(
    private providersEvalService: ProvidersEvalService,
    private modalService: NgbModal, 
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.UpdateProviderEval();
    this.searchControl.valueChanges
    .pipe(debounceTime(200))
    .subscribe(value => {
      this.filterData(value);
    });
  }

  UpdateProviderEval(){
    this.providersEvalService.GetAllProviderEval().subscribe({
      next: (resp) => {
        this.ProviderEval =  [...resp];
        this.ProviderEval = resp;
      }
    });
  }

  filterData(val) {
    if (val) {
      val = val.toLowerCase();
    } else {
      return this.ProviderEvalFiltered = [...this.ProviderEval];
    }

    const columns = Object.keys(this.ProviderEval[0]);
    if (!columns.length) {
      return;
    }

    const rows = this.ProviderEval.filter(function(d) {
      for (let i = 0; i <= columns.length; i++) {
        const column = columns[i];
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });
    this.ProviderEvalFiltered = rows;
  }

  DeleteProviderEval(content, idEval: number){
    this.selectedProviderEval= this.ProviderEval.find(s => s.idEval == idEval);
    this.modalService.open(content, 
      { 
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      }).result.then((result) => {
        if(result){
          this.providersEvalService.DeleteProviderEval(idEval).subscribe({next: (resp) => {
            if(resp){
              this.UpdateProviderEval();
            }
          }})
        }
      });
  }
  EditProviderEval(content, idEval: number){
    this.selectedProviderEval = this.ProviderEval.find(s => s.idEval == idEval);
    this.editProviderEvalForm = this._formBuilder.group({
      idEval: [this.selectedProviderEval.idEval],
      idStatus: [this.selectedProviderEval.idStatus],
      name: [this.selectedProviderEval.name],
      lastname: [this.selectedProviderEval.lastName],
      phone: [this.selectedProviderEval.phone],
      observations: [this.selectedProviderEval.observations],
      idCategory: [this.selectedProviderEval.idCategory],
      email: [this.selectedProviderEval.email],
      department: [this.selectedProviderEval.department],
      country: [this.selectedProviderEval.country],
      company: [this.selectedProviderEval.company],
    });

    let ProviderEvalToUpdate = {... this.selectedProviderEval}

    this.modalService.open(content, 
      { 
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      }).result.then((result) => {
        if(result){
          ProviderEvalToUpdate.observations = this.editProviderEvalForm.value?.observations;
          ProviderEvalToUpdate.company= this.editProviderEvalForm.value?.observations;
          ProviderEvalToUpdate.country = this.editProviderEvalForm.value?.observations;
          ProviderEvalToUpdate.department = this.editProviderEvalForm.value?.observations;
          ProviderEvalToUpdate.email = this.editProviderEvalForm.value?.observations;
          ProviderEvalToUpdate.idCategory = this.editProviderEvalForm.value?.observations;
          ProviderEvalToUpdate.idEval = this.editProviderEvalForm.value?.observations;
          ProviderEvalToUpdate.idStatus = this.editProviderEvalForm.value?.observations;
          ProviderEvalToUpdate.lastName = this.editProviderEvalForm.value?.observations;
          ProviderEvalToUpdate.name = this.editProviderEvalForm.value?.observations;
          ProviderEvalToUpdate.phone = this.editProviderEvalForm.value?.observations;
          
          this.providersEvalService.UpdateProviderEval(ProviderEvalToUpdate ).subscribe({next: (resp) => {
            if(resp){
              this.UpdateProviderEval();
            }
          }})
        }
      });
  }

}
