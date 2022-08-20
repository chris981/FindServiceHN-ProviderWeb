import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
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
  selectedUser = "";

  constructor(
    private userService: UserService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    
    this.updateUsers();
    this.searchControl.valueChanges
    .pipe(debounceTime(200))
    .subscribe(value => {
      this.filerData(value);
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

  filerData(val) {
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
    this.selectedUser = this.users.find(s => s.id == userId).userName;
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

}
