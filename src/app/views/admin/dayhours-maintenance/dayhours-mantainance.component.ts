import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DayhoursModel } from 'src/app/shared/models/dayhours-model';
import { DayhoursService } from 'src/app/shared/services/dayhours.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-dayhours-mantainance',
  templateUrl: './dayhours-mantainance.component.html',
  styleUrls: ['./dayhours-mantainance.component.scss']
})
export class DayhoursMantainanceComponent implements OnInit {

  searchControl: UntypedFormControl = new UntypedFormControl();
  dayHours: Array<DayhoursModel>;
  dayHoursFiltered: Array<DayhoursModel>;
  selectedDayHours: DayhoursModel;
  editDayHoursForm: FormGroup;

  constructor(
    private dayHoursService: DayhoursService,
    private modalService: NgbModal, 
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.updateDayHours();
    this.searchControl.valueChanges
    .pipe(debounceTime(200))
    .subscribe(value => {
      this.filterData(value);
    });
  }

  updateDayHours(){
    this.dayHoursService.GetAlldayHours().subscribe({
      next: (resp) => {
        this.dayHours =  [...resp];
        this.dayHoursFiltered = resp;
      }
    });
  }

  filterData(val) {
    if (val) {
      val = val.toLowerCase();
    } else {
      return this.dayHoursFiltered = [...this.dayHours];
    }

    const columns = Object.keys(this.dayHours[0]);
    if (!columns.length) {
      return;
    }

    const rows = this.dayHours.filter(function(d) {
      for (let i = 0; i <= columns.length; i++) {
        const column = columns[i];
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });
    this.dayHoursFiltered = rows;
  }

  DeleteDayHours(content, id: number){
    this.selectedDayHours = this.dayHours.find(s => s.idHour == id);
    this.modalService.open(content, 
      { 
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      }).result.then((result) => {
        if(result){
          this.dayHoursService.DeleteDayHours(id).subscribe({next: (resp) => {
            if(resp){
              this.updateDayHours();
            }
          }})
        }
      });
  }

  EditDayHours(content, id: number){
    this.selectedDayHours = this.dayHours.find(s => s.idHour == id);
    this.editDayHoursForm = this._formBuilder.group({
      id: [this.selectedDayHours.idHour],
      hour: [this.selectedDayHours.hour]
    });

    let dayHoursToUpdate = {... this.selectedDayHours}

    this.modalService.open(content, 
      { 
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      }).result.then((result) => {
        if(result){
          dayHoursToUpdate.hour = this.editDayHoursForm.value?.hour;
          this.dayHoursService.UpdateDayHours(dayHoursToUpdate).subscribe({next: (resp) => {
            if(resp){
              this.updateDayHours();
            }
          }})
        }
      });
  }
}

