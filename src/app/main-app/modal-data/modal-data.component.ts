import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-data',
  templateUrl: './modal-data.component.html',
  styleUrls: ['./modal-data.component.css'],
})
export class ModalDataComponent implements OnInit {
  showModal: boolean = false;

  constructor() {}

  ngOnInit(): void {}
  fetchApartmentDetails() {
    this.showModal = true;
  }

  submitForm() {
    this.showModal = false;
  }

  closeModal() {
    this.showModal = false;
  }

  get modalDisplayStyle() {
    return this.showModal ? 'block' : 'none';
  }
}
