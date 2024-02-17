import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ApartmentData } from '../model/apartment-data';
import { FlatData } from '../model/flat-data';


@Component({
  selector: 'app-modal-apartment',
  templateUrl: './modal-apartment.component.html',
  styleUrl: './modal-apartment.component.css'
})
export class ModalApartmentComponent implements OnInit {

  @Input() showModal: boolean;

  @Output() aptModalReset: EventEmitter<any> = new EventEmitter();

  apartmentDataForm: FormGroup;

  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    this.apartmentDataForm = this.fb.group({
      apartmentName: ['', Validators.required],
      numberOfFloors: ['', Validators.required],
      flatsPerFloor: ['', Validators.required],
      numberOfParking: ['', Validators.required]
    })
  }

  closeModal() { }

  submitForm(event: Event) {
    event.preventDefault(); // Prevent default form submission behavior
    if (this.apartmentDataForm.valid) {
      const formData = this.apartmentDataForm.value;
      var apartment = new ApartmentData();
      apartment.apartmentName = formData.apartmentName;
      apartment.apartmentPerFloor = formData.flatsPerFloor;
      apartment.floors = formData.numberOfFloors;
      apartment.parkingSpaces = formData.numberOfParking;
      apartment.flats = this.generateFlatData(formData.numberOfFloors, formData.flatsPerFloor);
      this.aptModalReset.emit(apartment);
    }
  }

  generateFlatData(floors: number, flats: number): FlatData[] {
    var flatArray: FlatData[] = [];
    for (let i = 1; i <= floors; i++) {
      for (let j = 1; j <= flats; j++) {
        var flat = new FlatData(j, i, false, {});
        flatArray.push(flat);
      }
    }
    return flatArray;
  }

  get modalDisplayStyle() {
    return this.showModal ? 'block' : 'none';
  }
}
