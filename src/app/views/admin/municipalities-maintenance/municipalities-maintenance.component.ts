import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from 'rxjs/operators';
import { MunicipalitiesModel } from 'src/app/shared/models/municipalities-model';
import { MunicipalitiesService } from 'src/app/shared/services/municipalities.service';

@Component({
  selector: 'app-municipalities-maintenance',
  templateUrl: './municipalities-maintenance.component.html',
  styleUrls: ['./municipalities-maintenance.component.scss']
})
export class MunicipalitiesMaintenanceComponent implements OnInit {

  searchControl: UntypedFormControl = new UntypedFormControl();
  municipality: Array<MunicipalitiesModel>;
  municipalityFiltered: Array<MunicipalitiesModel>;
  selectedMunicipality: MunicipalitiesModel;
  editMunicipalityForm: FormGroup;

  constructor(
    private municipalityService: MunicipalitiesService,
    private modalService: NgbModal, 
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.updateMunicipality();
    this.searchControl.valueChanges
    .pipe(debounceTime(200))
    .subscribe(value => {
      this.filterData(value);
    });
  }

  updateMunicipality(){
    this.municipalityService.GetAllMunicipalities().subscribe({
      next: (resp) => {
        this.municipality =  [...resp];
        this.municipalityFiltered = resp;
      }
    });
  }

  filterData(val) {
    if (val) {
      val = val.toLowerCase();
    } else {
      return this.municipalityFiltered = [...this.municipality];
    }

    const columns = Object.keys(this.municipality[0]);
    if (!columns.length) {
      return;
    }

    const rows = this.municipality.filter(function(d) {
      for (let i = 0; i <= columns.length; i++) {
        const column = columns[i];
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });
    this.municipalityFiltered = rows;
  }

  DeleteMunicipality(content, idMunicipality: number){
    this.selectedMunicipality = this.municipality.find(s => s.idMunicipality == idMunicipality);
    this.modalService.open(content, 
      { 
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      }).result.then((result) => {
        if(result){
          this.municipalityService.DeleteMunicipality(idMunicipality).subscribe({next: (resp) => {
            if(resp){
              this.updateMunicipality();
            }
          }})
        }
      });
  }

  EditMunicipality(content, idMunicipality: number){
    this.selectedMunicipality = this.municipality.find(s => s.idMunicipality == idMunicipality);
    this.editMunicipalityForm = this._formBuilder.group({
      idCountry: [this.selectedMunicipality.idCountry],
      idDepartment: [this.selectedMunicipality.idDepartment],
      description: [this.selectedMunicipality.description],
      creationDate: [this.selectedMunicipality.creationDate],
      idUserCreation: [this.selectedMunicipality.idUserCreation],
      idStatus: [this.selectedMunicipality.idStatus],
    });

    let municipalityToUpdate = {... this.selectedMunicipality}

    this.modalService.open(content, 
      { 
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      }).result.then((result) => {
        if(result){
          municipalityToUpdate.idDepartment = this.editMunicipalityForm.value?.idDepartment;
          municipalityToUpdate.idCountry = this.editMunicipalityForm.value?.idCountry;
          municipalityToUpdate.description = this.editMunicipalityForm.value?.description;
          municipalityToUpdate.creationDate = this.editMunicipalityForm.value?.creationDate;
          municipalityToUpdate.idUserCreation = this.editMunicipalityForm.value?.idUserCreation;
          municipalityToUpdate.idStatus = this.editMunicipalityForm.value?.idStatus;
          this.municipalityService.UpdateMunicipality(municipalityToUpdate).subscribe({next: (resp) => {
            if(resp){
              this.updateMunicipality();
            }
          }})
        }
      });  
  } 

}
