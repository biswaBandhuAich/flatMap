// grid.component.ts
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ApartmentData } from '../model/apartment-data';

@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent implements OnInit, OnChanges {
  @Input() apartment: ApartmentData;

  @Output() myEventEmitter: EventEmitter<any> = new EventEmitter();

  showDefaultMessage = false;
  floors: number | undefined;
  flats: number | undefined;
  gridsRequired: number | undefined;
  actualGrids: { pageNumber: number; rows: number; cols: number }[] = [];
  currentPage = 0;
  data: any[][] = [];
  squareData: any[][] = [];

  rows = 6;
  columns = 6;


  constructor() { }
  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.generateSquareData(this.apartment?.floors, this.apartment?.apartmentPerFloor);
  }

  generateSquareData(floors: number, apts: number) {
    this.squareData = [];
    for (let i = 0; i < floors; i++) {
      this.squareData[i] = [];
      for (let j = 0; j < apts; j++) {
        this.squareData[i][j] = i + 'x' + j;
      }
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.actualGrids.length - 1) {
      this.currentPage++;
    }
  }

  resetTable() {
    this.currentPage = 0;
    this.actualGrids = [];
    this.floors = 0;
    this.flats = 0;
  }
  openModal(data) {

    this.myEventEmitter.emit(data);
  }
}
