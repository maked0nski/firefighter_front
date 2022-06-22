import {Component, OnInit} from '@angular/core';
import {FuelCardService} from "../../../../service";
import {IFuelCard} from "../../../../interfaces";
import {MatTableDataSource} from '@angular/material/table';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-fuel-card',
  templateUrl: './fuel-cards.component.html',
  styleUrls: ['./fuel-cards.component.css']
})
export class FuelCardsComponent implements OnInit {

  displayedColumns: string[] = ['number', 'pin', 'active', 'station_brend', 'edit', 'delete'];

  fuelCards: MatTableDataSource<IFuelCard>;

  fuelCardForm: FormGroup;

  constructor(private fuelCardService: FuelCardService) {
    this._createForm()
  }

  ngOnInit(): void {
    this.fuelCardService.findAll().subscribe(value => {
      this.fuelCards = new MatTableDataSource(value)
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.fuelCards.filter = filterValue.trim().toLowerCase();
  }

  _createForm(): void {
    this.fuelCardForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    })
  }

  edit(id: string) {
    console.log(id);
  }

  delete(id: string) {
    this.fuelCardService.delete(id).subscribe(value => {
      this.fuelCardService.findAll().subscribe(value1 => this.fuelCards = new MatTableDataSource(value1))
    })
  }
}
