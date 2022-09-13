import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from 'rxjs/operators';
import { ServiceStatusModel } from 'src/app/shared/models/service-status-model';
import { ServiceStatusService } from 'src/app/shared/services/service-status.service';

@Component({
  selector: 'app-service-status-mantainance',
  templateUrl: './service-status-mantainance.component.html',
  styleUrls: ['./service-status-mantainance.component.scss']
})
export class ServiceStatusMantainanceComponent implements OnInit {

 

  searchControl: UntypedFormControl = new UntypedFormControl();
  servicesStatus: Array<ServiceStatusModel>;
  servicesStatusFiltered: Array<ServiceStatusModel>;
  selectedServicesStatus: ServiceStatusModel;
  editServicesStatusForm: FormGroup;

  constructor(
    private servicesStatusService: ServiceStatusService,
    private modalService: NgbModal, 
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.updateServicesStatus();
    this.searchControl.valueChanges
    .pipe(debounceTime(200))
    .subscribe(value => {
      this.filterData(value);
    });
  }

  updateServicesStatus(){
    this.servicesStatusService.GetAllServicesStatus().subscribe({
      next: (resp) => {
        this.servicesStatus =  [...resp];
        this.servicesStatusFiltered = resp;
      }
    });
  }

  filterData(val) {
    if (val) {
      val = val.toLowerCase();
    } else {
      return this.servicesStatusFiltered = [...this.servicesStatus];
    }

    const columns = Object.keys(this.servicesStatus[0]);
    if (!columns.length) {
      return;
    }

    const rows = this.servicesStatus.filter(function(d) {
      for (let i = 0; i <= columns.length; i++) {
        const column = columns[i];
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });
    this.servicesStatusFiltered = rows;
  }

  DeleteServicesStatus(content, ServicesStatusid: number){
    this.selectedServicesStatus = this.servicesStatus.find(s => s.idServicesStatus == ServicesStatusid);
    this.modalService.open(content, 
      { 
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      }).result.then((result) => {
        if(result){
          this.servicesStatusService.DeleteServicesStatus(ServicesStatusid).subscribe({next: (resp) => {
            if(resp){
              this.updateServicesStatus();
            }
          }})
        }
      });
  }

  EditServicesStatus(content, ServicesStatusid: number){
    this.selectedServicesStatus = this.servicesStatus.find(s => s.idServicesStatus == ServicesStatusid);
    this.editServicesStatusForm = this._formBuilder.group({
      idStatus: [this.selectedServicesStatus.idStatus],
      description: [this.selectedServicesStatus.description]
    });

    let servicesStatusToUpdate = {... this.selectedServicesStatus}

    this.modalService.open(content, 
      { 
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      }).result.then((result) => {
        if(result){
          servicesStatusToUpdate.idStatus = this.editServicesStatusForm.value?.idStatus;
          servicesStatusToUpdate.description = this.editServicesStatusForm.value?.description;

          this.servicesStatusService.UpdateServicesStatus(servicesStatusToUpdate).subscribe({next: (resp) => {
            if(resp){
              this.updateServicesStatus();
            }
          }})
        }
      });
  }

}
