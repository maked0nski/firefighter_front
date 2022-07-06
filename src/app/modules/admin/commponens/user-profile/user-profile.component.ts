import {MatExpansionPanel} from "@angular/material/expansion";
import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

import {UserProfileService} from "../../service";
import {DataService} from "../../../../services";
import {IUser} from "../../intesface";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: IUser;
  form: FormGroup;
  @ViewChild(MatExpansionPanel) pannel?: MatExpansionPanel;

  constructor(
    private userProfileService: UserProfileService,
    private dataService: DataService,
  ) {
    this
      ._createForm()
  }

  ngOnInit():void {
    this.dataService.userStorage.subscribe(value => {
      if (value) {
        this.user = value
      }
    })
  }

  _createForm():void {
    this.form = new FormGroup({
      surename: new FormControl(null),
      name: new FormControl(null),
      fathersname: new FormControl(null),
      phone: new FormControl(null),
      birthday: new FormControl(null),
      image: new FormControl(null),
      role: new FormControl(null),
      // positionId: new FormControl(null, Validators.required),
    })
  }

  update() {
    this.userProfileService.update(this.user.id, this.form.getRawValue()).subscribe(value => {
      this.dataService.userStorage.next(value)
    })
    if (!this.pannel) return;  // перевіряю та закриваю панель редагування Карточок
    this.pannel.close();
  }

  edit() {
    this.form.setValue({
      surename: this.user.surename,
      name: this.user.name,
      fathersname: this.user.fathersname,
      phone: this.user.phone,
      birthday: this.user.birthday,
      image: this.user.image,
      role: this.user.role,
      // positionId: this.user.positionId,
    })
  }
}
