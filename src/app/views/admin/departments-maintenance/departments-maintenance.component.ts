import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from 'rxjs/operators';
import { DepartmentesModel } from 'src/app/shared/models/departmentes-model';
import { DepartmentsService } from 'src/app/shared/services/departments.service';

@Component({
  selector: 'app-departments-maintenance',
  templateUrl: './departments-maintenance.component.html',
  styleUrls: ['./departments-maintenance.component.scss']
})
export class DepartmentsMaintenanceComponent implements OnInit {

  searchControl: UntypedFormControl = new UntypedFormControl();
  department: Array<DepartmentesModel>;
  departmentsFiltered: Array<DepartmentesModel>;
  selectedDepartment: DepartmentesModel;
  editDepartmentForm: FormGroup;
  createDepartmentForm: FormGroup;

  constructor(
    private deparmentsService: DepartmentsService,
    private modalService: NgbModal, 
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.updateDepartment();
    this.searchControl.valueChanges
    .pipe(debounceTime(200))
    .subscribe(value => {
      this.filterData(value);
    });
  }

  updateDepartment(){
    this.deparmentsService.GetAllDepartment().subscribe({
      next: (resp) => {
        this.department =  [...resp];
        this.departmentsFiltered = resp;
      }
    });
  }

  filterData(val) {
    if (val) {
      val = val.toLowerCase();
    } else {
      return this.departmentsFiltered = [...this.department];
    }

    const columns = Object.keys(this.department[0]);
    if (!columns.length) {
      return;
    }

    const rows = this.department.filter(function(d) {
      for (let i = 0; i <= columns.length; i++) {
        const column = columns[i];
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });
    this.departmentsFiltered = rows;
  }

  DeleteDepartment(content, idDepartment: number){
    this.selectedDepartment = this.department.find(s => s.idDepartment == idDepartment);
    this.modalService.open(content, 
      { 
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      }).result.then((result) => {
        if(result){
          this.deparmentsService.DeleteDepartment(idDepartment).subscribe({next: (resp) => {
            if(resp){
              this.updateDepartment();
            }
          }})
        }
      });
  }

  CreateDepartment(content){
    this.createDepartmentForm = this._formBuilder.group({
      idCountry: null,
      description: null,
      createdDate: null,
      idUserCreation: null,
      condition: null,
    });

    let departmentToCreate = {... this.selectedDepartment}

    this.modalService.open(content, 
      { 
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      }).result.then((result) => {
        if(result){
          departmentToCreate.idCountry = this.createDepartmentForm.value?.idCountry;
          departmentToCreate.description = this.createDepartmentForm.value?.description;
          departmentToCreate.createdDate = this.createDepartmentForm.value?.createdDate;
          departmentToCreate.idUserCreation = this.createDepartmentForm.value?.idUserCreation;
          departmentToCreate.condition = this.createDepartmentForm.value?.condition;
          this.deparmentsService.CreateDepartment(departmentToCreate).subscribe({next: (resp) => {
            if(resp){
              this.updateDepartment();
            }
          }})
        }
      });  
  } 

  EditDepartment(content, idDepartment: number){
    this.selectedDepartment = this.department.find(s => s.idDepartment == idDepartment);
    this.editDepartmentForm = this._formBuilder.group({
      idCountry: [this.selectedDepartment.idCountry],
      description: [this.selectedDepartment.description],
      createdDate: [this.selectedDepartment.createdDate],
      idUserCreation: [this.selectedDepartment.idUserCreation],
      condition: [this.selectedDepartment.condition],
    });

    let departmentToUpdate = {... this.selectedDepartment}

    this.modalService.open(content, 
      { 
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      }).result.then((result) => {
        if(result){
          departmentToUpdate.idCountry = this.editDepartmentForm.value?.idCountry;
          departmentToUpdate.description = this.editDepartmentForm.value?.description;
          departmentToUpdate.createdDate = this.editDepartmentForm.value?.createdDate;
          departmentToUpdate.idUserCreation = this.editDepartmentForm.value?.idUserCreation;
          departmentToUpdate.condition = this.editDepartmentForm.value?.condition;
          this.deparmentsService.UpdateDepartment(departmentToUpdate).subscribe({next: (resp) => {
            if(resp){
              this.updateDepartment();
            }
          }})
        }
      });  
  } 

}
