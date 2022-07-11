import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {IClient} from "../../../../interfaces";
import {ClientsService} from "../../service";
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatAccordion} from "@angular/material/expansion";

@Component({
  selector: 'app-client',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'city', 'adress'];
  table: MatTableDataSource<IClient>;
  arrey: IClient[];
  form: FormGroup;
  @ViewChild(MatAccordion) accordion: MatAccordion;


  constructor(
    private clientService: ClientsService,
    private activatedRoute: ActivatedRoute
  ) {
    activatedRoute.data.subscribe(value => {
      this.arrey = value['clients'];
      this._createTable()
    })
    this._createForm()
  }

  ngOnInit(): void {
  }

  _createForm(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      city: new FormControl(null, [Validators.required]),
      adress: new FormControl(null, [Validators.required]),
      coordinate: new FormControl(null, [Validators.required]),
      service_contract: new FormControl(null),
    })
  }

  _createTable(): void {
    this.table = new MatTableDataSource(this.arrey);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.table.filter = filterValue.trim().toLowerCase();
  }

  create() {
    this.clientService
      .create(this.form.getRawValue())
      .subscribe(value => {
        this.arrey.push(value);
        this._createTable();
        this.accordion?.closeAll();
        this.form.reset();
      })
  }
}
