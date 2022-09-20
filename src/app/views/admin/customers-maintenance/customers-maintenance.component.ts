import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from 'rxjs/operators';
import { CustomersModel } from 'src/app/shared/models/customers-model';
import { CustomersService } from 'src/app/shared/services/customers.service';

@Component({
  selector: 'app-customers-maintenance',
  templateUrl: './customers-maintenance.component.html',
  styleUrls: ['./customers-maintenance.component.scss']
})
export class CustomersMaintenanceComponent implements OnInit {

  searchControl: UntypedFormControl = new UntypedFormControl();
  customer: Array<CustomersModel>;
  customerFiltered: Array<CustomersModel>;
  selectedCustomer: CustomersModel;
  editCustomerForm: FormGroup;
  createCustomerForm: FormGroup;

  constructor(
    private customerService: CustomersService,
    private modalService: NgbModal, 
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.updateCustomer();
    this.searchControl.valueChanges
    .pipe(debounceTime(200))
    .subscribe(value => {
      this.filterData(value);
    });
  }

  updateCustomer(){
    this.customerService.GetAllCustomers().subscribe({
      next: (resp) => {
        this.customer =  [...resp];
        this.customerFiltered = resp;
      }
    });
  }

  filterData(val) {
    if (val) {
      val = val.toLowerCase();
    } else {
      return this.customerFiltered = [...this.customer];
    }

    const columns = Object.keys(this.customer[0]);
    if (!columns.length) {
      return;
    }

    const rows = this.customer.filter(function(d) {
      for (let i = 0; i <= columns.length; i++) {
        const column = columns[i];
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });
    this.customerFiltered = rows;
  }

  DeleteCustomer(content, idCustomer: number){
    this.selectedCustomer = this.customer.find(s => s.idCustomer == idCustomer);
    this.modalService.open(content, 
      { 
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      }).result.then((result) => {
        if(result){
          this.customerService.DeleteCustomer(idCustomer).subscribe({next: (resp) => {
            if(resp){
              this.updateCustomer();
            }
          }})
        }
      });
  }
  CreateCustomer(content){
    this.createCustomerForm = this._formBuilder.group({
      emailpassword: null,
      rtn: null,
      identificationcard: null,
      name: null,
      lastName: null,
      idCustomerAddress: null,
      country: null,
      department: null,
      municipality: null,
      birthDate: null,
      phone: null,
      status: null,
      profilePicture: null,
      mainProfile: null,
      keyValidation: null,
      userType: null,
      registrationDate: null 
    });

    let customerToCreate = {... this.selectedCustomer}

    this.modalService.open(content, 
      { 
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      }).result.then((result) => {
        if(result){
          customerToCreate.emailpassword = this.createCustomerForm.value?.emailpassword;
          customerToCreate.rtn = this.createCustomerForm.value?.rtn;
          customerToCreate.identificationcard = this.createCustomerForm.value?.identificationcard;
          customerToCreate.name = this.createCustomerForm.value?.name;
          customerToCreate.lastName = this.createCustomerForm.value?.lastName;
          customerToCreate.idCustomerAddress = this.createCustomerForm.value?.idCustomerAddress;
          customerToCreate.country = this.createCustomerForm.value?.country;
          customerToCreate.department = this.createCustomerForm.value?.department;
          customerToCreate.municipality = this.createCustomerForm.value?.municipality;
          customerToCreate.birthDate = this.createCustomerForm.value?.birthDate;
          customerToCreate.phone = this.createCustomerForm.value?.phone;
          customerToCreate.status = this.createCustomerForm.value?.status;
          customerToCreate.profilePicture = this.createCustomerForm.value?.profilePicture;
          customerToCreate.mainProfile = this.createCustomerForm.value?.mainProfile;
          customerToCreate.keyValidation = this.createCustomerForm.value?.keyValidation;
          customerToCreate.registrationDate = this.createCustomerForm.value?.registrationDate;

          this.customerService.CreateCustomer(customerToCreate).subscribe({next: (resp) => {
            if(resp){
              this.updateCustomer();
            }
          }})
        }
      });
   }

  EditCustomer(content, idCustomer: number){
    this.selectedCustomer = this.customer.find(s => s.idCustomer == idCustomer);
    this.editCustomerForm = this._formBuilder.group({
      emailpassword: [this.selectedCustomer.emailpassword],
      rtn: [this.selectedCustomer.rtn],
      identificationcard: [this.selectedCustomer.identificationcard],
      name: [this.selectedCustomer.name],
      lastName: [this.selectedCustomer.lastName],
      idCustomerAddress: [this.selectedCustomer.idCustomerAddress],
      country: [this.selectedCustomer.country],
      department: [this.selectedCustomer.department],
      municipality: [this.selectedCustomer.municipality],
      birthDate: [this.selectedCustomer.birthDate],
      phone: [this.selectedCustomer.phone],
      status: [this.selectedCustomer.status],
      profilePicture: [this.selectedCustomer.profilePicture],
      mainProfile: [this.selectedCustomer.mainProfile],
      keyValidation: [this.selectedCustomer.keyValidation],
      userType: [this.selectedCustomer.userType],
      registrationDate: [this.selectedCustomer.registrationDate]
    });

    let customerToUpdate = {... this.selectedCustomer}

    this.modalService.open(content, 
      { 
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      }).result.then((result) => {
        if(result){
          customerToUpdate.emailpassword = this.editCustomerForm.value?.emailpassword;
          customerToUpdate.rtn = this.editCustomerForm.value?.rtn;
          customerToUpdate.identificationcard = this.editCustomerForm.value?.identificationcard;
          customerToUpdate.name = this.editCustomerForm.value?.name;
          customerToUpdate.lastName = this.editCustomerForm.value?.lastName;
          customerToUpdate.idCustomerAddress = this.editCustomerForm.value?.idCustomerAddress;
          customerToUpdate.country = this.editCustomerForm.value?.country;
          customerToUpdate.department = this.editCustomerForm.value?.department;
          customerToUpdate.municipality = this.editCustomerForm.value?.municipality;
          customerToUpdate.birthDate = this.editCustomerForm.value?.birthDate;
          customerToUpdate.phone = this.editCustomerForm.value?.phone;
          customerToUpdate.status = this.editCustomerForm.value?.status;
          customerToUpdate.profilePicture = this.editCustomerForm.value?.profilePicture;
          customerToUpdate.mainProfile = this.editCustomerForm.value?.mainProfile;
          customerToUpdate.keyValidation = this.editCustomerForm.value?.keyValidation;
          customerToUpdate.registrationDate = this.editCustomerForm.value?.registrationDate;

          this.customerService.UpdateCustomer(customerToUpdate).subscribe({next: (resp) => {
            if(resp){
              this.updateCustomer();
            }
          }})
        }
      });
   }
}
