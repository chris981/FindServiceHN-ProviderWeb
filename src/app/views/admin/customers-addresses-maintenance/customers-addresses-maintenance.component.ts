import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from 'rxjs/operators';
import { CustomersAddressModel } from 'src/app/shared/models/customers-address-model';
import { CustomersAddressesService } from 'src/app/shared/services/customers-addresses.service';


@Component({
  selector: 'app-customers-addresses-maintenance',
  templateUrl: './customers-addresses-maintenance.component.html',
  styleUrls: ['./customers-addresses-maintenance.component.scss']
})
export class CustomersAddressesMaintenanceComponent implements OnInit {

  searchControl: UntypedFormControl = new UntypedFormControl();
  customerAddress: Array<CustomersAddressModel>;
  customerAddressFiltered: Array<CustomersAddressModel>;
  selectedCustomerAddress: CustomersAddressModel;
  editCustomerAddressForm: FormGroup;
  createCustomerAddressForm: FormGroup;

  constructor(
    private customersAddressService: CustomersAddressesService,
    private modalService: NgbModal, 
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.updateCustomerAddress();
    this.searchControl.valueChanges
    .pipe(debounceTime(200))
    .subscribe(value => {
      this.filterData(value);
    });
  }

  updateCustomerAddress(){
    this.customersAddressService.GetAllCustomersAddress().subscribe({
      next: (resp) => {
        this.customerAddress =  [...resp];
        this.customerAddressFiltered = resp;
      }
    });
  }

  filterData(val) {
    if (val) {
      val = val.toLowerCase();
    } else {
      return this.customerAddressFiltered = [...this.customerAddress];
    }

    const columns = Object.keys(this.customerAddress[0]);
    if (!columns.length) {
      return;
    }

    const rows = this.customerAddress.filter(function(d) {
      for (let i = 0; i <= columns.length; i++) {
        const column = columns[i];
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });
    this.customerAddressFiltered = rows;
  }

  DeleteCustomerAddress(content, idCustomer: number){
    this.selectedCustomerAddress = this.customerAddress.find(s => s.idCustomer == idCustomer);
    this.modalService.open(content, 
      { 
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      }).result.then((result) => {
        if(result){
          this.customersAddressService.DeleteCustomerAddress(idCustomer).subscribe({next: (resp) => {
            if(resp){
              this.updateCustomerAddress();
            }
          }})
        }
      });
  }
  CreateCustomerAddress(content){
    this.createCustomerAddressForm = this._formBuilder.group({
      idCustomer: null,
      idCountry: null,
      idDepartment: null,
      idMunicipality: null,
      direction: null,
      observations: null,
      idStatus: null
    });

    let customerAddressCreate = {... this.selectedCustomerAddress}

    this.modalService.open(content, 
      { 
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      }).result.then((result) => {
        if(result){
          customerAddressCreate.idCustomer = this.createCustomerAddressForm.value?.idCustomer;
          customerAddressCreate.idCountry = this.createCustomerAddressForm.value?.idCountry;
          customerAddressCreate.idDepartment = this.createCustomerAddressForm.value?.idDepartment;
          customerAddressCreate.idMunicipality = this.createCustomerAddressForm.value?.idMunicipality;
          customerAddressCreate.direction = this.createCustomerAddressForm.value?.direction;
          customerAddressCreate.observations = this.createCustomerAddressForm.value?.observations;
          customerAddressCreate.idStatus = this.createCustomerAddressForm.value?.idStatus;
          this.customersAddressService.CreateCustomerAddress(customerAddressCreate).subscribe({next: (resp) => {
            if(resp){
              this.updateCustomerAddress();
            }
          }})
        }
      });
   }

  EditCustomerAddress(content, idCustomerAddress: number){
    this.selectedCustomerAddress = this.customerAddress.find(s => s.idCustomerAddress == idCustomerAddress);
    this.editCustomerAddressForm = this._formBuilder.group({
      idCustomer: [this.selectedCustomerAddress.idCustomer],
      idCountry: [this.selectedCustomerAddress.idCountry],
      idDepartment: [this.selectedCustomerAddress.idDepartment],
      idMunicipality: [this.selectedCustomerAddress.idMunicipality],
      direction: [this.selectedCustomerAddress.direction],
      observations: [this.selectedCustomerAddress.observations],
      idStatus: [this.selectedCustomerAddress.idStatus]
    });

    let customerAddressToUpdate = {... this.selectedCustomerAddress}

    this.modalService.open(content, 
      { 
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      }).result.then((result) => {
        if(result){
          customerAddressToUpdate.idCustomer = this.editCustomerAddressForm.value?.idCustomer;
          customerAddressToUpdate.idCountry = this.editCustomerAddressForm.value?.idCountry;
          customerAddressToUpdate.idDepartment = this.editCustomerAddressForm.value?.idDepartment;
          customerAddressToUpdate.idMunicipality = this.editCustomerAddressForm.value?.idMunicipality;
          customerAddressToUpdate.direction = this.editCustomerAddressForm.value?.direction;
          customerAddressToUpdate.observations = this.editCustomerAddressForm.value?.observations;
          customerAddressToUpdate.idStatus = this.editCustomerAddressForm.value?.idStatus;
          this.customersAddressService.UpdateCustomerAddress(customerAddressToUpdate).subscribe({next: (resp) => {
            if(resp){
              this.updateCustomerAddress();
            }
          }})
        }
      });
   }
}
