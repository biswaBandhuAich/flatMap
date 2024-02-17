import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApartmentData } from './model/apartment-data';
import { MasterData } from './model/master-data';
import { FlatData } from './model/flat-data';
import { UserData } from './model/user-data';
import { UserDataService } from './services/user-data-service';
import { ApartmentDataService } from './services/apartment-data-service';

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.css'],
})
export class MainAppComponent implements OnInit {
  displayModal: boolean = false;
  displayAptModal: boolean = false;
  selectedOption: ApartmentData | undefined;
  masterData: MasterData;
  apartments: ApartmentData[] = [];

  flatSelectedForBooking: FlatData;

  rows: number = 0;
  columns: number = 0;
  squareData: any[][] = [];

  constructor(private userService: UserDataService, private apartmentService: ApartmentDataService) {
    this.masterData = new MasterData(this.apartments);
    this.apartmentService.getapartmentDatas().subscribe(r => {
      r.forEach(p => {
        this.apartments.push(p);
      });
    })
  }


  ngOnInit(): void {

  }

  onSelectionChange() {
  }

  fetchSelectedFlat(data: FlatData) {
    if (this.selectedOption && data) {
      this.flatSelectedForBooking = data;
    }
    this.displayModal = !this.displayModal;
  }


  //synchronisation error might happen
  saveUserData(data: UserData) {
    if (data) {
      this.selectedOption.flats.forEach((e, index) => {
        if (e.flatNo === this.flatSelectedForBooking.flatNo && e.floorNo === this.flatSelectedForBooking.floorNo) {
          e.isBooked = true;
          e.isLandowners = data.isLandOwner;
          data.flatNumber = e.flatNo;
          data.floor = e.floorNo;
          e.allocatedTo = data;
          if (data.parkingOpted) {
            this.selectedOption.parkingLeft = this.selectedOption.parkingLeft - 1;
          }
        }
      })
      this.apartmentService.updateapartmentData(this.selectedOption.id, this.convertToPlainObject(this.selectedOption));
    }
    this.displayModal = !this.displayModal;
    this.resetApartmentList();
  }

  convertToPlainObject<T>(obj: T): any {
    if (typeof obj !== 'object' || obj === null) {
      return obj; // Base case: return primitive types and null as is
    }

    const plainObject: any = Array.isArray(obj) ? [] : {}; // Determine if obj is an array or an object

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        plainObject[key] = this.convertToPlainObject(obj[key]); // Recursively convert nested objects
      }
    }
    return plainObject;
  }

  addNewApartment() {
    this.displayAptModal = !this.displayAptModal
  }

  saveApartmentData(data: ApartmentData) {
    this.displayAptModal = !this.displayAptModal;
    this.apartmentService.addapartmentData(this.convertToPlainObject(data));
  }

  resetApartmentList() {
    this.apartments = [];
    this.apartmentService.getapartmentDatas().subscribe(r => {
      r.forEach(p => {
        this.apartments.push(p);
      });
    })
  }
}
