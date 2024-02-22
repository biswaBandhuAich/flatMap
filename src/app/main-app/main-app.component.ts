import { ChangeDetectionStrategy, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApartmentData } from './model/apartment-data';
import { MasterData } from './model/master-data';
import { FlatData } from './model/flat-data';
import { UserData } from './model/user-data';
import { UserDataService } from './services/user-data-service';
import { ApartmentDataService } from './services/apartment-data-service';
import { FormControl } from '@angular/forms';

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

  showUserDataOnClick: boolean;

  showModalUserDats = 'none';
  showModalGrid = 'none'
  userDataShow: UserData;

  isParkingAvailable = false;

  parkingPercent = '0%';

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
    const totalSpace = this.selectedOption?.parkingSpaces;
    const parkingLeft = this.selectedOption?.parkingLeft;
    const parkindPercent = Math.floor((parkingLeft / totalSpace) * 100);
    this.parkingPercent = parkindPercent.toString() + "%";
  }


  fetchSelectedFlat(data: FlatData) {
    if (this.selectedOption && data) {
      this.flatSelectedForBooking = data;
    }
    if (this.selectedOption.parkingLeft > 0) {
      this.isParkingAvailable = true;
    }
    this.displayModal = !this.displayModal;
    this.showModalGrid = 'block';
  }


  //synchronisation error might happen
  saveUserData(data: UserData) {
    if (data) {
      this.selectedOption.flats.forEach((e, index) => {
        if (e.flatNo === this.flatSelectedForBooking.flatNo && e.floorNo === this.flatSelectedForBooking.floorNo) {
          e.isBooked = true;
          data.flatNumber = e.flatNo;
          data.floor = e.floorNo;
          e.allocatedTo = data;
          if (data.parkingOpted) {
            this.selectedOption.parkingLeft = this.selectedOption.parkingLeft - 1;
          }
        }
      })
      console.log(this.selectedOption);
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

  showUserDataHove(data: UserData) {
    this.showModalUserDats = 'block';
    this.showUserDataOnClick = !this.showUserDataOnClick;
    this.userDataShow = data;
  }

  closeHoverModal() {
    this.showUserDataOnClick = !this.showUserDataOnClick;
    this.showModalUserDats = 'none';
  }
}
