import { UserData } from './user-data';

export class FlatData {
  id: string;
  flatNo: number;
  floorNo: number;
  isBooked: boolean;
  allocatedTo: UserData | undefined;

  constructor(
    id: string,
    flatNo: number,
    floorNo: number,
    isBooked: boolean,
    allocatedTo: UserData
  ) {
    this.id = id;
    this.flatNo = flatNo;
    this.floorNo = floorNo;
    this.isBooked = isBooked;
    this.allocatedTo = allocatedTo;
  }
}
