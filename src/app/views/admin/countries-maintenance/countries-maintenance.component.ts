import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from 'rxjs/operators';
import { CountriesModel } from 'src/app/shared/models/countries-model';
import { CountriesService } from 'src/app/shared/services/countries.service';

@Component({
  selector: 'app-countries-maintenance',
  templateUrl: './countries-maintenance.component.html',
  styleUrls: ['./countries-maintenance.component.scss']
})
export class CountriesMaintenanceComponent implements OnInit {

  searchControl: UntypedFormControl = new UntypedFormControl();
  countries: Array<CountriesModel>;
  countriesFiltered: Array<CountriesModel>;
  selectedCountries: CountriesModel;
  editCountriesForm: FormGroup;

  constructor(
    private countriesService: CountriesService,
    private modalService: NgbModal, 
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.updateCountry();
    this.searchControl.valueChanges
    .pipe(debounceTime(200))
    .subscribe(value => {
      this.filterData(value);
    });
  }

  updateCountry(){
    this.countriesService.GetAllCustomers().subscribe({
      next: (resp) => {
        this.countries =  [...resp];
        this.countriesFiltered = resp;
      }
    });
  }

  filterData(val) {
    if (val) {
      val = val.toLowerCase();
    } else {
      return this.countriesFiltered = [...this.countries];
    }

    const columns = Object.keys(this.countries[0]);
    if (!columns.length) {
      return;
    }

    const rows = this.countries.filter(function(d) {
      for (let i = 0; i <= columns.length; i++) {
        const column = columns[i];
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });
    this.countriesFiltered = rows;
  }

  DeleteCountry(content, idCountry: number){
    this.selectedCountries = this.countries.find(s => s.idCountry == idCountry);
    this.modalService.open(content, 
      { 
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      }).result.then((result) => {
        if(result){
          this.countriesService.DeleteCustomer(idCountry).subscribe({next: (resp) => {
            if(resp){
              this.updateCountry();
            }
          }})
        }
      });
  }

  EditCountry(content, idCountry: number){
    this.selectedCountries = this.countries.find(s => s.idCountry == idCountry);
    this.editCountriesForm = this._formBuilder.group({
      name: [this.selectedCountries.name],
      countryCode: [this.selectedCountries.countryCode],
      idStatus: [this.selectedCountries.idStatus],
      idUserCreation: [this.selectedCountries.idUserCreation],
      creationDate: [this.selectedCountries.creationDate],
    });

    let countryToUpdate = {... this.selectedCountries}

    this.modalService.open(content, 
      { 
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      }).result.then((result) => {
        if(result){
          countryToUpdate.name = this.editCountriesForm.value?.name;
          countryToUpdate.countryCode = this.editCountriesForm.value?.countryCode;
          countryToUpdate.idStatus = this.editCountriesForm.value?.idStatus;
          countryToUpdate.idUserCreation = this.editCountriesForm.value?.idUserCreation;
          countryToUpdate.creationDate = this.editCountriesForm.value?.creationDate;
          this.countriesService.UpdateCustomer(countryToUpdate).subscribe({next: (resp) => {
            if(resp){
              this.updateCountry();
            }
          }})
        }
      });  
  }  

}
