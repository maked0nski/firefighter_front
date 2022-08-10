import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from "@angular/material/expansion";

import {IClient, IObservation} from "../../../../interfaces";
import {DataService} from "../../../../services";
import {ObservationService} from "../../service";

@Component({
  selector: 'app-observation',
  templateUrl: './observation.component.html',
  styleUrls: ['./observation.component.css']
})
export class ObservationComponent implements OnInit {

  client: IClient | undefined;
  form: FormGroup;
  observation: IObservation | undefined;

  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor(
    private dataService: DataService,
    private observationService: ObservationService
  ) {
    this.dataService.clientStorage.subscribe(value => {
      this.client = value;
      this.observation = value?.observation;
    })
    this._createForm()
  }

  ngOnInit(): void {
  }

  _createForm(): void {
    this.form = new FormGroup({
      number: new FormControl(null, Validators.required),
      contract: new FormControl(null, [Validators.required]),
      sim_cardId: new FormControl(null, [Validators.required]),
    })
  }

  edit() {
    if (this.observation && this.client?.id) {
      let data = {
        id: this.observation.id,
        number: Number(this.form.getRawValue().number),
        contract: this.form.getRawValue().contract,
        sim_cardId: this.form.getRawValue().sim_cardId,
      }
      this.observationService
        .update(data.id, data)
    }
  }

  _fildForm(){
    if (this.observation){
      this.form.setValue({
        number:this.observation.number,
        contract:this.observation.contract,
        sim_cardId:this.observation.sim_cardId,
      })
    }

  }


}
