import { UserData } from './user-data';

export class FlatData {
  id: string;
  flatNo: number;
  floorNo: number;
  isBooked: boolean;
  allocatedTo: UserData | any;

  constructor(
    flatNo: number,
    floorNo: number,
    isBooked: boolean,
    allocatedTo: UserData | any
  ) {
    this.flatNo = flatNo;
    this.floorNo = floorNo;
    this.isBooked = isBooked;
    this.allocatedTo = allocatedTo;
  }
}
