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
  @Input() parkingAvailable: boolean;
  emailError: string;

  constructor(private fb: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.parkingAvailable) {
      this.customerDataForm.get('optedForParking').setValue(false);
      this.customerDataForm.get('optedForParking').enable();
    }
  }
  ngOnInit(): void {
    this.emailError = '';
    this.customerDataForm = this.fb.group({
      customerName: ['', Validators.required],
      bookingDate: ['', Validators.required],
      agreementDate: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      contactNumber: ['', Validators.required],
      optedForParking: [{ value: false, disabled: true }], // Default value for checkbox
      squareFeetRate: ['', Validators.required],
      developmentFees: ['', Validators.required],
      parkingFees: [{ value: '', disabled: true }],
      bookingAmount: ['', Validators.required],
      isLandowners: [false], // Default value for checkbox
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
      customer.parkingOpted = customerData.optedForParking ? customerData.optedForParking : false;
      customer.parkingFees = customerData.parkingFees ? customerData.parkingFees : 0;
      customer.bookingAmount = customerData.bookingAmount;
      customer.email = customerData.emailId;
      customer.contactNumber = customerData.contactNumber;
      customer.squareFeetRate = customerData.squareFeetRate;
      customer.developmentFees = customerData.developmentFees;
      this.modalReset.emit(customer);
    }
    this.customerDataForm.reset();
    this.showModal = false;
  }

  closeModal() {
    this.customerDataForm.reset();
    this.emailError = ''
    this.showModal = false;
    this.modalReset.emit();
  }

  get modalDisplayStyle() {
    return this.showModal ? 'block' : 'none';
  }
  parkingOpted() {
    if (this.customerDataForm.value.optedForParking) {
      this.customerDataForm.get('parkingFees').enable();
      this.customerDataForm.get('parkingFees').setValidators(Validators.required);
      this.customerDataForm.get('parkingFees').setValue('');

    }
    else {
      this.customerDataForm.get('parkingFees').setValue('');
      this.customerDataForm.get('parkingFees').removeValidators(Validators.required);
      this.customerDataForm.get('parkingFees').disable();
    }
  }

  toggleInputType(element: HTMLInputElement, eventType: string) {
    if (eventType === 'focus') {
      element.type = 'date';
    } else if (eventType === 'blur') {
      element.type = 'text';
    }
  }
  validateEmail() {
    const email = this.customerDataForm.get('emailId')?.value.toString().trim();
    if (email && email !== '') {
      if (this.customerDataForm.get('emailId').invalid) {
        this.emailError = '** Incorrect email id format';
      } else {
        this.emailError = '';
      }

    } else {
      this.emailError = '** Email Id is required';
    }
  }
}
