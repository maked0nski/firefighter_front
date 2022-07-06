import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatTableDataSource} from '@angular/material/table';
import {MatExpansionPanel} from "@angular/material/expansion";
import {ActivatedRoute} from "@angular/router";

import {FuelCardService} from "../../service";
import {IFuelCard} from "../../../../interfaces";
import {RegEx} from "../../../../constants";



@Component({
  selector: 'app-fuel-card',
  templateUrl: './fuel-cards.component.html',
  styleUrls: ['./fuel-cards.component.css']
})
export class FuelCardsComponent implements OnInit {

  displayedColumns: string[] = ['number', 'pin', 'active', 'station_brend', 'edit', 'delete'];

  fuelCards: MatTableDataSource<IFuelCard>;

  fuelCardsArr: IFuelCard[];

  fuelCardForm: FormGroup;

  cardForUpdate: IFuelCard | null;

  @ViewChild(MatExpansionPanel) pannel?: MatExpansionPanel;

  constructor(
    private fuelCardService: FuelCardService,
    private activatedRoute: ActivatedRoute
  ) {
    activatedRoute.data.subscribe(value => {
      this.fuelCardsArr = value['fuelCard'];
      this.createTable()
    })
    this._createForm()
  }

  ngOnInit(): void {
  }

  _createForm(): void {
    this.fuelCardForm = new FormGroup({
      number: new FormControl(null, Validators.required),
      pin: new FormControl(null, [Validators.required, Validators.pattern(RegEx.pin)]),
      station_brend: new FormControl(null, [Validators.required]),
      active: new FormControl(false, Validators.required),
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.fuelCards.filter = filterValue.trim().toLowerCase();
  }

  edit(card: IFuelCard): void {
    this.cardForUpdate = card;
    this.fuelCardForm.setValue({
      number: card.number,
      pin: card.pin,
      active: card.active,
      station_brend: card.station_brend
    })
    if (!this.pannel) {
      return
    }
    this.pannel.open()
  }

  delete(id: string) {
    this.fuelCardService.delete(id).subscribe(() => {
      const index = this.fuelCardsArr.findIndex(card => card.id === +id);
      this.fuelCardsArr.splice(index, 1)
      this.createTable()
    })
  }

  save(): void {
    if (!this.cardForUpdate) {
      this.fuelCardService.create(this.fuelCardForm.getRawValue()).subscribe(value => {
        this.fuelCardsArr.push(value);
        this.fuelCardForm.reset();
        // this.fuelCardForm.untouched;
        this.createTable();
      })
    } else {
      this.fuelCardService.update(this.cardForUpdate.id, this.fuelCardForm.getRawValue()).subscribe(value => {
        let fuelCard = this.fuelCardsArr.find(f => f.id === this.cardForUpdate?.id);
        Object.assign(fuelCard, value);
        this.cardForUpdate = null;
        this.fuelCardForm.reset();
        // this.fuelCardForm.untouched;
        this.createTable();
      })
    }

    if (!this.pannel) return;  // перевіряю та закриваю панель редагування Карточок
    this.pannel.close();
  }

  createTable(): void {
    this.fuelCards = new MatTableDataSource(this.fuelCardsArr);
  }
}
