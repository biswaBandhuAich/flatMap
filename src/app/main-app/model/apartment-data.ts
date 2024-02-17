import { FlatData } from './flat-data';

export class ApartmentData {
  id: string;
  apartmentName: string;
  floors: number;
  apartmentPerFloor: number;
  toatalSpaces: number;
  parkingSpaces: number;
  parkingLeft: number;
  flats: FlatData[];

  // constructor(
  //   apartmentName: string,
  //   floors: number,
  //   apartmentPerFloor: number,
  //   toatalSpaces: number,
  //   parkingSpaces: number,
  //   parkingLeft: number,
  //   flats: FlatData[]) {
  //   this.apartmentName = apartmentName;
  //   this.floors = floors;
  //   this.apartmentPerFloor = apartmentPerFloor;
  //   this.toatalSpaces = toatalSpaces;
  //   this.parkingSpaces = parkingSpaces;
  //   this.parkingLeft = parkingLeft;
  //   this.flats = flats;
  // }
  constructor() {

  }
}
