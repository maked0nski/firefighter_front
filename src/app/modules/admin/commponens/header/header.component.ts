import {Component, OnInit} from '@angular/core';

import {AuthService} from "../../../../services";
import {DataService} from "../../../../services";
import {IUser} from "../../intesface";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userData :IUser | undefined

  constructor(
    private authService: AuthService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.dataService.userStorage.subscribe(value => {
      this.userData = value
    })
  }

  logout() {
    this.authService.logout()
  }
}
