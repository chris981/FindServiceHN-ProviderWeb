import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubcategoriesModel } from 'src/app/shared/models/subcategories-model';
import { SubcategoriesService } from 'src/app/shared/services/subcategories.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-subcategories-mantainance',
  templateUrl: './subcategories-mantainance.component.html',
  styleUrls: ['./subcategories-mantainance.component.scss']
})
export class SubcategoriesMantainanceComponent implements OnInit {

  searchControl: UntypedFormControl = new UntypedFormControl();
  subcategories: Array<SubcategoriesModel>;
  subcategoryFiltered: Array<SubcategoriesModel>;
  selectedsubCategory: SubcategoriesModel;
  editsubCategoryForm: FormGroup;

  constructor(
    private subcategoriesService: SubcategoriesService,
    private modalService: NgbModal, 
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.UpdateSubCategories();
    this.searchControl.valueChanges
    .pipe(debounceTime(200))
    .subscribe(value => {
      this.filterData(value);
    });
  }

  UpdateSubCategories(){
    this.subcategoriesService.GetAllSubCategories().subscribe({
      next: (resp) => {
        this.subcategories =  [...resp];
        this.subcategoryFiltered = resp;
      }
    });
  }

  filterData(val) {
    if (val) {
      val = val.toLowerCase();
    } else {
      return this.subcategoryFiltered = [...this.subcategories];
    }

    const columns = Object.keys(this.subcategories[0]);
    if (!columns.length) {
      return;
    }

    const rows = this.subcategories.filter(function(d) {
      for (let i = 0; i <= columns.length; i++) {
        const column = columns[i];
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });
    this.subcategoryFiltered = rows;
  }

  DeleteSubCategories(content, subcategoryId: number){
    this.selectedsubCategory = this.subcategories.find(s => s.idSubCategories == subcategoryId);
    this.modalService.open(content, 
      { 
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      }).result.then((result) => {
        if(result){
          this.subcategoriesService.DeleteSubCategories(subcategoryId).subscribe({next: (resp) => {
            if(resp){
              this.UpdateSubCategories();
            }
          }})
        }
      });
  }

  EditSubCategory(content, subcategoryId: number){
    this.selectedsubCategory = this.subcategories.find(s => s.idSubCategories == subcategoryId);
    this.editsubCategoryForm = this._formBuilder.group({
      IdCategory: [this.selectedsubCategory.idCategory],
      Description: [this.selectedsubCategory.description],
      Creationdate: [this.selectedsubCategory.creationDate],
      IdUserCreation: [this.selectedsubCategory.idUserCreation],      
      Image: [this.selectedsubCategory.image]
    });

    let subcategoryToUpdate = {... this.selectedsubCategory}

    this.modalService.open(content, 
      { 
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      }).result.then((result) => {
        if(result){
          subcategoryToUpdate.idCategory = this.editsubCategoryForm.value?.IdCategory;
          subcategoryToUpdate.description = this.editsubCategoryForm.value?.Description;
          subcategoryToUpdate.creationDate = this.editsubCategoryForm.value?.Creationdate;
          subcategoryToUpdate.idUserCreation = this.editsubCategoryForm.value?.IdUserCreation;          
          subcategoryToUpdate.image = this.editsubCategoryForm.value?.Image;
          this.subcategoriesService.UpdateSubCategories(subcategoryToUpdate).subscribe({next: (resp) => {
            if(resp){
              this.UpdateSubCategories();
            }
          }})
        }
      });
  }

}
