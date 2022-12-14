import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from 'rxjs/operators';
import { ProvidersModel } from 'src/app/shared/models/providers-model';
import { ProvidersService } from 'src/app/shared/services/providers.service';
@Component({
  selector: 'app-provider-mantainance',
  templateUrl: './provider-mantainance.component.html',
  styleUrls: ['./provider-mantainance.component.scss']
})
export class ProviderMantainanceComponent implements OnInit {

  searchControl: UntypedFormControl = new UntypedFormControl();
  Providers: Array<ProvidersModel>;
  ProvidersFiltered: Array<ProvidersModel>;
  selectedProviders: ProvidersModel;
  editProvidersForm: FormGroup;
  createProvidersForm: FormGroup;
  constructor(
    private providersService: ProvidersService,
    private modalService: NgbModal, 
    private _formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.UpdateProviders();
    this.searchControl.valueChanges
    .pipe(debounceTime(200))
    .subscribe(value => {
      this.filterData(value);
    });
  }

  UpdateProviders(){
    this.providersService.GetAllProviders().subscribe({
      next: (resp) => {
        this.Providers =  [...resp];
        this.Providers = resp;
      }
    });
  }

  filterData(val) {
    if (val) {
      val = val.toLowerCase();
    } else {
      return this.ProvidersFiltered = [...this.Providers];
    }

    const columns = Object.keys(this.Providers[0]);
    if (!columns.length) {
      return;
    }

    const rows = this.Providers.filter(function(d) {
      for (let i = 0; i <= columns.length; i++) {
        const column = columns[i];
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });
    this.ProvidersFiltered = rows;
  }

  DeleteProviders(content, idProvider: number){
    this.selectedProviders= this.Providers.find(s => s.idProvider == idProvider);
    this.modalService.open(content, 
      { 
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      }).result.then((result) => {
        if(result){
          this.providersService.DeleteProviders(idProvider).subscribe({next: (resp) => {
            if(resp){
              this.UpdateProviders();
            }
          }})
        }
      });
  }
  CreateProvider(content){

    this.createProvidersForm = this._formBuilder.group({
      email: null,
    password: null,
    rtn: null,
    company: null,
    identificationCard: null,
    name: null,
    lastName: null,
    country: null,
    department: null,
    municipality: null,
    phone: null,
    idCategory: null,
    idSubcategory: null,
    indusCai: null,
    indDelivery: null,
    attentionFirst: null,
    attentionlast: null,
    idStatus: null,
    profilePicture: null,
    profilePrincipal: null,
    url: null,
    qtyWorks: null,
    keyValidation: null,
    userType: null
    });
    let providersToCreate = {...this.selectedProviders}
    this.modalService.open(content, 
      {
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      }).result.then((result) => {
        if(result){
          providersToCreate.email = this.createProvidersForm.value?.email;
          providersToCreate.password = this.createProvidersForm.value?.password;
          providersToCreate.rtn = this.createProvidersForm.value?.rtn;
          providersToCreate.company = this.createProvidersForm.value?.company;
          providersToCreate.identificationCard = this.createProvidersForm.value?.identificationCard;
          providersToCreate.name = this.createProvidersForm.value?.name;
          providersToCreate.lastName = this.createProvidersForm.value?.lastName;
          providersToCreate.country = this.createProvidersForm.value?.country;
          providersToCreate.department = this.createProvidersForm.value?.department;
          providersToCreate.municipality = this.createProvidersForm.value?.municipality;
          providersToCreate.phone = this.createProvidersForm.value?.phone;
          providersToCreate.idCategory = this.createProvidersForm.value?.idcategory;
          providersToCreate.idSubcategory = this.createProvidersForm.value?.idsubcategory;
          providersToCreate.indusCai = this.createProvidersForm.value?.indusCai;
          providersToCreate.indDelivery = this.createProvidersForm.value?.indDelivery;
          providersToCreate.attentionFirst = this.createProvidersForm.value?.attentionFirst;
          providersToCreate.attentionlast = this.createProvidersForm.value?.attentionlast;
          providersToCreate.idStatus = this.createProvidersForm.value?.idStatus;
          providersToCreate.profilePicture = this.createProvidersForm.value?.profilePicture;
          providersToCreate.profilePrincipal = this.createProvidersForm.value?.profilePrincipal;
          providersToCreate.url = this.createProvidersForm.value?.url;
          providersToCreate.qtyWorks = this.createProvidersForm.value?.qtyWorks;
          providersToCreate.keyValidation = this.createProvidersForm.value?.keyValidation;
          providersToCreate.userType = this.createProvidersForm.value?.userType;
          
          
          this.providersService.CreateProviders(providersToCreate).subscribe({next: (resp) => {
            if(resp){
              this.UpdateProviders();
            }
          }})
        }
      })
  }

  EditProviders(content, idProvider: number){
    this.selectedProviders = this.Providers.find(s => s.idProvider == idProvider);
    this.editProvidersForm = this._formBuilder.group({
      idprovider: [this.selectedProviders.idProvider],
      idStatus: [this.selectedProviders.idStatus],
      idcategory: [this.selectedProviders.idCategory],
      idsubcategory: [this.selectedProviders.idSubcategory],
      identificationCard: [this.selectedProviders.identificationCard],
      indDelivery: [this.selectedProviders.indDelivery],
      email: [this.selectedProviders.email],
      department: [this.selectedProviders.department],
      country: [this.selectedProviders.country],
      company: [this.selectedProviders.company],
      attetionlast: [this.selectedProviders.attentionlast],
      attetionfirst: [this.selectedProviders.attentionFirst],
      induCai: [this.selectedProviders.indusCai],
      keyvalidation: [this.selectedProviders.keyValidation],
      lastname: [this.selectedProviders.lastName],
      municipality: [this.selectedProviders.municipality],
      name: [this.selectedProviders.name],
      password: [this.selectedProviders.password],
      phone: [this.selectedProviders.phone],
      profilePicture: [this.selectedProviders.profilePicture],
    ProfilePrincipal: [this.selectedProviders.profilePrincipal],
      qtyWork: [this.selectedProviders.qtyWorks],
      rtn: [this.selectedProviders.rtn],
      url: [this.selectedProviders.url],
      usertype: [this.selectedProviders.userType],
     

    });

    let ProvidersToUpdate = {... this.selectedProviders}

    this.modalService.open(content, 
      { 
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      }).result.then((result) => {
        if(result){
          ProvidersToUpdate.idStatus = this.editProvidersForm.value?.IdStatus;
          ProvidersToUpdate.idProvider = this.editProvidersForm.value?.idProvider;
          ProvidersToUpdate.idCategory = this.editProvidersForm.value?.idCategory;
          ProvidersToUpdate.idSubcategory = this.editProvidersForm.value?.idSubcategory;
          ProvidersToUpdate.email = this.editProvidersForm.value?.email;
          ProvidersToUpdate.department = this.editProvidersForm.value?.department;
          ProvidersToUpdate.country = this.editProvidersForm.value?.country;
          ProvidersToUpdate.company = this.editProvidersForm.value?.company;
          ProvidersToUpdate.attentionlast = this.editProvidersForm.value?.attentionlast;
          ProvidersToUpdate.attentionFirst= this.editProvidersForm.value?.attentionFirst;
          ProvidersToUpdate.identificationCard = this.editProvidersForm.value?.identificationCard;
          ProvidersToUpdate.indDelivery = this.editProvidersForm.value?.indDelivery;
          ProvidersToUpdate.indusCai = this.editProvidersForm.value?.indusCai;
          ProvidersToUpdate.keyValidation = this.editProvidersForm.value?.keyValidation;
          ProvidersToUpdate.lastName = this.editProvidersForm.value?.lastName;
          ProvidersToUpdate.municipality = this.editProvidersForm.value?.municipality;
          ProvidersToUpdate.name = this.editProvidersForm.value?.name;
          ProvidersToUpdate.password = this.editProvidersForm.value?.password;
          ProvidersToUpdate.phone = this.editProvidersForm.value?.phone;
          ProvidersToUpdate.profilePicture = this.editProvidersForm.value?.profilePicture;
          ProvidersToUpdate.profilePrincipal = this.editProvidersForm.value?.profilePrincipal;
          ProvidersToUpdate.qtyWorks = this.editProvidersForm.value?.qtyWorks;
          ProvidersToUpdate.rtn = this.editProvidersForm.value?.rtn;
          ProvidersToUpdate.url = this.editProvidersForm.value?.url;
          ProvidersToUpdate.userType = this.editProvidersForm.value?.userType;
          this.providersService.UpdateProviders(ProvidersToUpdate ).subscribe({next: (resp) => {
            if(resp){
              this.UpdateProviders();
            }
          }})
        }
      });
  }


}
