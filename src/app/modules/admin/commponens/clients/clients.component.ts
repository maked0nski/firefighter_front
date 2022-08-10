import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatAccordion} from "@angular/material/expansion";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";

import {IClient} from "../../../../interfaces";
import {ClientsService} from "../../service";

@Component({
  selector: 'app-client',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'city', 'adress', 'delete'];
  table: MatTableDataSource<IClient>;
  arrey: IClient[];
  form: FormGroup;
  @ViewChild(MatAccordion) accordion: MatAccordion;


  constructor(
    private clientService: ClientsService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
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

  delete(id: number,templateRef: any) {
    console.log(id)
    this.openDialog(templateRef)
  }

  openDialog(templateRef: any): void {
    this.dialog.open(templateRef, {
      width: '300px'
    });
  }


}
