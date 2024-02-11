// grid.component.ts
import {
  Component,
  Input,
  OnChanges,
  OnInit,
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

  showDefaultMessage = false;
  floors: number | undefined;
  flats: number | undefined;
  gridsRequired: number | undefined;
  actualGrids: { pageNumber: number; rows: number; cols: number }[] = [];
  currentPage = 0;
  data: any[][] = [];

  constructor() { }
  ngOnInit(): void {
    this.generateGrids(this.apartment);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.generateGrids(this.apartment);
  }

  generateGrids(apartments: ApartmentData) {
    if (!apartments) {
      this.showDefaultMessage = true;
    } else {
      this.resetTable();
      this.showDefaultMessage = false;
      this.floors = this.apartment?.floors;
      this.flats = this.apartment?.apartmentPerFloor;
      if (this.floors && this.flats) {
        var totalFlats = this.floors * this.flats;
        this.gridsRequired =
          totalFlats % 16 === 0
            ? totalFlats / 16
            : Math.floor(totalFlats / 16) + 1;
      }
      if (this.gridsRequired !== 1) {

      }
      else {
        alert(this.gridsRequired);
        for (let i = 0; i < this.apartment?.floors; i++) {
          this.data[i] = [];
          for (let j = 0; j < this.apartment?.apartmentPerFloor; j++) {
            this.actualGrids.push({ pageNumber: 1, rows: this.apartment.floors, cols: this.apartment.apartmentPerFloor })
            this.data[i][j] = "astika    "
          }
        }
        console.log(this.data)
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
}
