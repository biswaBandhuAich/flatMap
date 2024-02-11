import { ApartmentData } from './apartment-data';

export class MasterData {
  apartments: ApartmentData[];

  constructor(apatments: ApartmentData[]) {
    this.apartments = apatments;
  }
}
