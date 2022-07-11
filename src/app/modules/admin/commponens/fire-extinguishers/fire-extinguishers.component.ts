import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from "../../../../services";
import {IClient, IFireExtinguishers} from "../../../../interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatExpansionPanel} from "@angular/material/expansion";
import {FireExtinguishersService} from "../../service";

@Component({
  selector: 'app-fire-extinguishers',
  templateUrl: './fire-extinguishers.component.html',
  styleUrls: ['./fire-extinguishers.component.css']
})
export class FireExtinguishersComponent implements OnInit {

  displayedColumns: string[] = ['model', 'quantity', 'next_check', 'edit', 'delete'];


  client: IClient | undefined;
  form: FormGroup;
  table: MatTableDataSource<IFireExtinguishers>;

  fire_extinguishers: IFireExtinguishers[] = [];

  forUpdate: IFireExtinguishers | null;

  @ViewChild(MatExpansionPanel) pannel?: MatExpansionPanel;

  constructor(
    private dataService: DataService,
    private fireExtinguishersService: FireExtinguishersService
  ) {
    this.dataService.clientStorage.subscribe(value => {
      this.client = value
      if (value?.fire_extinguishers) {
        this.fire_extinguishers = value?.fire_extinguishers;
      }

      this._createTable()
    })
    this._createForm()
  }

  _createTable(): void {
    this.table = new MatTableDataSource(this.fire_extinguishers);
  }

  ngOnInit(): void {
  }

  save(): void {
    let rawValue = this.form.getRawValue();
    rawValue = {
      ...rawValue,
      reminding: true,
      quantity: Number(rawValue.quantity),
    }
    if (!this.forUpdate) {
      this.fireExtinguishersService
        .create(rawValue)
        .subscribe(value => {
          this.fire_extinguishers.push(value);
          this._createTable();
          this.pannel?.close();
          this.form.reset();
        })
    } else {
      rawValue = {
        ...rawValue,
        id: Number(this.forUpdate.id)
      }
      this.fireExtinguishersService
        .update(this.forUpdate.id, rawValue)
        .subscribe(value => {
          let find = this.fire_extinguishers.find(f => f.id === this.forUpdate?.id);
          Object.assign(find, value);
          this.forUpdate = null;
          this._createTable();
          this.pannel?.close();
          this.form.reset();
        })
    }
  }

  _createForm(): void {
    this.form = new FormGroup({
      model: new FormControl(null, Validators.required),
      quantity: new FormControl(null, Validators.required),
      next_check: new FormControl(null, [Validators.required]),
    })
  }

  edit(element: IFireExtinguishers): void {
    this.forUpdate = element
    this.form.setValue({
      model: this.forUpdate.model,
      quantity: Number(this.forUpdate.quantity),
      next_check: this.forUpdate.next_check
    })
    if (!this.pannel) {
      return
    }
    this.pannel.open()
  }

  delete(id: number) {
    this.fireExtinguishersService
      .delete(id)
      .subscribe(() => {
        let index = this.fire_extinguishers.findIndex(item => item.id===id);
        this.fire_extinguishers.splice(index,1);
        this._createTable();
      })
  }
}
