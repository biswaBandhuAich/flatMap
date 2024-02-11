import { FlatData } from './flat-data';

export class ApartmentData {
  apartmentName: string;
  floors: number;
  apartmentPerFloor: number;
  toatalSpaces: number;
  parkingSpaces: number;
  parkingLeft: number;
  flats: FlatData[] | undefined;

  constructor(
    apartmentName: string,
    floors: number,
    apartmentPerFloor: number,
    toatalSpaces: number,
    parkingSpaces: number,
    parkingLeft: number,
    flats: FlatData[] | undefined
  ) {
    this.apartmentName = apartmentName;
    this.floors = floors;
    this.apartmentPerFloor = apartmentPerFloor;
    this.toatalSpaces = toatalSpaces;
    this.parkingSpaces = parkingSpaces;
    this.parkingLeft = parkingLeft;
    this.flats = flats;
  }
}
