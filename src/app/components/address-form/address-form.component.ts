import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Address, AddressType } from '../../models/address.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-address-form',
  imports: [ FormsModule,  ReactiveFormsModule, CommonModule ],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.css'
})

export class AddressFormComponent implements OnChanges {
  @Input() mode: string = 'create';
  @Input() id: number = 0;
  @Input() address:AddressType = new Address(this.id, '', '', '', '', '', false);
  @Output() save = new EventEmitter<any>();
  @Output() setAsMain = new EventEmitter<any>();
  @Output() remove = new EventEmitter<any>();
  editMode: boolean = false;
  addressForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.addressForm = this.fb.group({
      id: [0],
      street: ['', Validators.required],
      complement: [''],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['address'] && changes['address'].currentValue) {
      this.addressForm.patchValue(this.address);
    }
  }

  onSubmit(): void {
    this.save.emit(this.addressForm.value);
    console.log(this.addressForm.value);
    this.editMode = false;
    if (this.mode === 'create') {
      this.addressForm.reset(new Address(this.id, '', '', '', '', '', false));
    }
  }

  setAddressAsMain(): void {
    this.setAsMain.emit(this.address.id);
  }

  removeAddress(): void {
    this.remove.emit(this.address.id);
  }

  toggleEdit(): void {
    this.editMode = !this.editMode;
    this.reinitializeForm();
  }

  reinitializeForm(): void {
    this.addressForm.patchValue(this.address);
  }
}
