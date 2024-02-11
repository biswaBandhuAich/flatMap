import { Component, OnInit } from '@angular/core';
import { ApartmentData } from './model/apartment-data';
import { MasterData } from './model/master-data';
import { FlatData } from './model/flat-data';
import { UserData } from './model/user-data';

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.css'],
})
export class MainAppComponent implements OnInit {
  displayModal: boolean = false;
  selectedOption: ApartmentData | undefined;
  masterData: MasterData;
  apartments: ApartmentData[] = [
    new ApartmentData('Demo Flat - 1', 4, 4, 0, 10, 2, undefined),
    new ApartmentData(
      'Demo Flat - 2',
      7,
      6,
      0,
      10,
      2,
      undefined
    ),
    new ApartmentData(
      'Demo Flat - 3',
      4,
      8,
      0,
      10,
      2,
      undefined
    )
    ,
    new ApartmentData(
      'Demo Flat - 4',
      15,
      2,
      0,
      10,
      2,
      undefined
    ),
  ];

  rows: number = 0;
  columns: number = 0;
  squareData: any[][] = [];

  constructor() {
    this.masterData = new MasterData(this.apartments);
  }

  ngOnInit(): void {
    console.log('Hi', this.selectedOption);
  }

  onSelectionChange() {
    console.log('Change');
  }

  openModal(data: any) {
    this.displayModal = !this.displayModal;
  }
}
