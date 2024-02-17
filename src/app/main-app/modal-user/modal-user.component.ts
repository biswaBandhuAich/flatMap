import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserData } from '../model/user-data';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.css'],
})
export class ModalUserComponent implements OnInit, OnChanges {

  @Input() showModal: boolean;
  @Output() modalReset: EventEmitter<any> = new EventEmitter();

  customerDataForm: FormGroup;


  constructor(private fb: FormBuilder) { }
  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void {
    this.customerDataForm = this.fb.group({
      customerName: ['', Validators.required],
      bookingDate: ['', Validators.required],
      agreementDate: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      contactNumber: ['', Validators.required],
      optedForParking: [false], // Default value for checkbox
      squareFeetRate: ['', Validators.required],
      developmentFees: ['', Validators.required],
      parkingFees: ['', Validators.required],
      bookingAmount: ['', Validators.required]
    });

  }

  fetchApartmentDetails() {
    this.showModal = true;
  }

  submitForm(event: Event) {
    event.preventDefault();
    if (this.customerDataForm.valid) {
      const customerData = this.customerDataForm.value;
      var customer = new UserData();
      customer.customerName = customerData.customerName;
      customer.agreementDate = customerData.agreementDate;
      customer.bookingAmount = customerData.bookingAmount;
      customer.bookingDate = customerData.bookingDate;
      customer.parkingOpted = customerData.optedForParking;
      customer.bookingAmount = customerData.bookingAmount;
      this.modalReset.emit(customer);
    }
    this.showModal = false;
  }

  closeModal() {
    this.showModal = false;
    this.modalReset.emit();
  }

  get modalDisplayStyle() {
    return this.showModal ? 'block' : 'none';
  }
}
