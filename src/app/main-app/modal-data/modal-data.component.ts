import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-data',
  templateUrl: './modal-data.component.html',
  styleUrls: ['./modal-data.component.css'],
})
export class ModalDataComponent implements OnInit, OnChanges {
  @Input() showModal: boolean;

  @Output() modalReset: EventEmitter<any> = new EventEmitter();

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void { }

  fetchApartmentDetails() {
    this.showModal = true;
  }

  submitForm() {
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
