import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProvidersServiceModel } from 'src/app/shared/models/providers-service-model';
import { ProvidersServiceService } from 'src/app/shared/services/providers-service.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-provider-service-mantainance',
  templateUrl: './provider-service-mantainance.component.html',
  styleUrls: ['./provider-service-mantainance.component.scss']
})
export class ProviderServiceMantainanceComponent implements OnInit {
   
  searchControl: UntypedFormControl = new UntypedFormControl();
  ProviderService: Array<ProvidersServiceModel>;
  ProviderServiceFiltered: Array<ProvidersServiceModel>;
  selectedProviderService: ProvidersServiceModel;
  editProviderServiceForm: FormGroup;


  constructor(
    private providerServiceService: ProvidersServiceService,
    private modalService: NgbModal, 
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.UpdateProviderService();
    this.searchControl.valueChanges
    .pipe(debounceTime(200))
    .subscribe(value => {
      this.filterData(value);
    });
  }

  UpdateProviderService(){
    this.providerServiceService.GetAllProviderService().subscribe({
      next: (resp) => {
        this.ProviderService =  [...resp];
        this.ProviderService = resp;
      }
    });
  }

  filterData(val) {
    if (val) {
      val = val.toLowerCase();
    } else {
      return this.ProviderServiceFiltered = [...this.ProviderService];
    }

    const columns = Object.keys(this.ProviderService[0]);
    if (!columns.length) {
      return;
    }

    const rows = this.ProviderService.filter(function(d) {
      for (let i = 0; i <= columns.length; i++) {
        const column = columns[i];
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });
    this.ProviderServiceFiltered = rows;
  }

  DeleteProviderService(content, idProviderService: number){
    this.selectedProviderService= this.ProviderService.find(s => s.idProviderService == idProviderService);
    this.modalService.open(content, 
      { 
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      }).result.then((result) => {
        if(result){
          this.providerServiceService.DeleteProvidersService(idProviderService).subscribe({next: (resp) => {
            if(resp){
              this.UpdateProviderService();
            }
          }})
        }
      });
  }
  EditProviderService(content, idProviderService: number){
    this.selectedProviderService = this.ProviderService.find(s => s.idProviderService == idProviderService);
    this.editProviderServiceForm = this._formBuilder.group({
      idproviderservice: [this.selectedProviderService.idProviderService],
      idproduct: [this.selectedProviderService.idProduct],
      currency:[this.selectedProviderService.currency],
      description:[this.selectedProviderService.description],
      idservicetype:[this.selectedProviderService.idServiceType],
      price:[this.selectedProviderService.price],
      productimage:[this.selectedProviderService.productImage],
      shipping:[this.selectedProviderService.shipping],
      typeservice:[this.selectedProviderService.typeService],
      idstatus:[this.selectedProviderService.idStatus],
      
    });

    let ProviderserviceToUpdate = {... this.selectedProviderService}

    this.modalService.open(content, 
      { 
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      }).result.then((result) => {
        if(result){
          ProviderserviceToUpdate.shipping = this.editProviderServiceForm.value?.shipping;
          ProviderserviceToUpdate.currency = this.editProviderServiceForm.value?.currency;
          ProviderserviceToUpdate.description = this.editProviderServiceForm.value?.description;
          ProviderserviceToUpdate.idProduct = this.editProviderServiceForm.value?.idProduct;
          ProviderserviceToUpdate.idProviderService = this.editProviderServiceForm.value?.idProviderService;
          ProviderserviceToUpdate.price = this.editProviderServiceForm.value?.price;
          ProviderserviceToUpdate.productImage = this.editProviderServiceForm.value?.productImage;
          ProviderserviceToUpdate.typeService = this.editProviderServiceForm.value?.typeService;
          ProviderserviceToUpdate.idServiceType = this.editProviderServiceForm.value?.idServiceType;
          ProviderserviceToUpdate.idStatus = this.editProviderServiceForm.value?.idStatus;
         
          this.providerServiceService.UpdateProviderService(ProviderserviceToUpdate ).subscribe({next: (resp) => {
            if(resp){
              this.UpdateProviderService();
            }
          }})
        }
      });
  }


}
