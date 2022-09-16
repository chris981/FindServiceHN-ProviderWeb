import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProviderPlansJobsModel } from 'src/app/shared/models/provider-plans-jobs-model';
import { ProvidersPlanJobsService } from 'src/app/shared/services/providers-plan-jobs.service';
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-provider-plans-jobs-mantainance',
  templateUrl: './provider-plans-jobs-mantainance.component.html',
  styleUrls: ['./provider-plans-jobs-mantainance.component.scss']
})
export class ProviderPlansJobsMantainanceComponent implements OnInit {

  searchControl: UntypedFormControl = new UntypedFormControl();
  ProviderPlanJobs: Array<ProviderPlansJobsModel>;
  ProviderPlanJobsFiltered: Array<ProviderPlansJobsModel>;
  selectedProviderPlanJobs: ProviderPlansJobsModel;
  editProviderPlanJobsForm: FormGroup;

  constructor(
    private providerPlanJobService: ProvidersPlanJobsService,
    private modalService: NgbModal, 
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.UpdateProviderPlanJobs();
    this.searchControl.valueChanges
    .pipe(debounceTime(200))
    .subscribe(value => {
      this.filterData(value);
    });
  }

  UpdateProviderPlanJobs(){
    this.providerPlanJobService.GetAllProviderPlanJobs().subscribe({
      next: (resp) => {
        this.ProviderPlanJobs =  [...resp];
        this.ProviderPlanJobs = resp;
      }
    });
  }

  filterData(val) {
    if (val) {
      val = val.toLowerCase();
    } else {
      return this.ProviderPlanJobsFiltered = [...this.ProviderPlanJobs];
    }

    const columns = Object.keys(this.ProviderPlanJobs[0]);
    if (!columns.length) {
      return;
    }

    const rows = this.ProviderPlanJobs.filter(function(d) {
      for (let i = 0; i <= columns.length; i++) {
        const column = columns[i];
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });
    this.ProviderPlanJobsFiltered = rows;
  }

  DeleteProviderPlanJobs(content, idQtyWorks: number){
    this.selectedProviderPlanJobs= this.ProviderPlanJobs.find(s => s.idQtyWorks == idQtyWorks);
    this.modalService.open(content, 
      { 
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      }).result.then((result) => {
        if(result){
          this.providerPlanJobService.DeleteProviderPlanJobs(idQtyWorks).subscribe({next: (resp) => {
            if(resp){
              this.UpdateProviderPlanJobs();
            }
          }})
        }
      });
  }
  EditProvidePlanJobs(content, idQtyWorks: number){
    this.selectedProviderPlanJobs = this.ProviderPlanJobs.find(s => s.idQtyWorks == idQtyWorks);
    this.editProviderPlanJobsForm = this._formBuilder.group({
      id: [this.selectedProviderPlanJobs.idQtyWorks],
      name: [this.selectedProviderPlanJobs.name],
      amount:[this.selectedProviderPlanJobs.amount],
      creationDate:[this.selectedProviderPlanJobs.creationDate]

    });

    let ProviderPlanJobToUpdate = {... this.selectedProviderPlanJobs}

    this.modalService.open(content, 
      { 
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      }).result.then((result) => {
        if(result){
          ProviderPlanJobToUpdate.creationDate = this.editProviderPlanJobsForm.value?.creationDate;
          ProviderPlanJobToUpdate.amount = this.editProviderPlanJobsForm.value?.amount;
          ProviderPlanJobToUpdate.idQtyWorks = this.editProviderPlanJobsForm.value?.idQtyWorks;
          ProviderPlanJobToUpdate.name = this.editProviderPlanJobsForm.value?.name;
          this.providerPlanJobService.UpdateProviderPlanJobs(ProviderPlanJobToUpdate ).subscribe({next: (resp) => {
            if(resp){
              this.UpdateProviderPlanJobs();
            }
          }})
        }
      });
  }

}
