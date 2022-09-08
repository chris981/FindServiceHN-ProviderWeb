import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl } from '@angular/forms';
import { UserModel } from 'src/app/shared/models/user-model';
import { UserService } from 'src/app/shared/services/user.service';
import { debounceTime } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-mantainance',
  templateUrl: './user-mantainance.component.html',
  styleUrls: ['./user-mantainance.component.scss']
})
export class UserMantainanceComponent implements OnInit {

  searchControl: UntypedFormControl = new UntypedFormControl();
  users: Array<UserModel>;
  usersFiltered: Array<UserModel>;
  selectedUser: UserModel;
  editUserForm: FormGroup;

  constructor(
    private userService: UserService,
    private modalService: NgbModal,private _formBuilder: FormBuilder) { 
    }

  ngOnInit(): void {
    
    this.updateUsers();
    this.searchControl.valueChanges
    .pipe(debounceTime(200))
    .subscribe(value => {
      this.filterData(value);
    });
  }

  updateUsers(){
    this.userService.GetAllUsers().subscribe({
      next: (resp) => {
        this.users =  [...resp];
        this.usersFiltered = resp;
      }
    });
  }

  filterData(val) {
    if (val) {
      val = val.toLowerCase();
    } else {
      return this.usersFiltered = [...this.users];
    }

    const columns = Object.keys(this.users[0]);
    if (!columns.length) {
      return;
    }

    const rows = this.users.filter(function(d) {
      for (let i = 0; i <= columns.length; i++) {
        const column = columns[i];
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });
    this.usersFiltered = rows;
  }

  DeleteUser(content, userId: number){
    this.selectedUser = this.users.find(s => s.id == userId);
    this.modalService.open(content, 
      { 
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      }).result.then((result) => {
        if(result){
          this.userService.DeletUser(userId).subscribe({next: (resp) => {
            if(resp){
              this.updateUsers();
            }
          }})
        }
      });
  }

  EditUser(content, userId: number){
    this.selectedUser = this.users.find(s => s.id == userId);
    this.editUserForm = this._formBuilder.group({
      userName: [this.selectedUser.userName],
      email: [this.selectedUser.email]
    });

    let userToUpdate = {... this.selectedUser}

    this.modalService.open(content, 
      { 
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      }).result.then((result) => {
        if(result){
          userToUpdate.email = this.editUserForm.value?.email;
          userToUpdate.userName = this.editUserForm.value?.userName;
          this.userService.UpdateUser(userToUpdate).subscribe({next: (resp) => {
            if(resp){
              this.updateUsers();
            }
          }})
        }
      });
  }

}
