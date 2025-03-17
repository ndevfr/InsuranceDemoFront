import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Phone, PhoneType } from '../../models/phone.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-phone-form',
  imports: [ FormsModule,  ReactiveFormsModule, CommonModule ],
  templateUrl: './phone-form.component.html',
  styleUrl: './phone-form.component.css'
})

export class PhoneFormComponent implements OnChanges {
  @Input() mode: string = 'create';
  @Input() id: number = 0;
  @Input() phone:PhoneType = new Phone(this.id, '', false);
  @Output() save = new EventEmitter<any>();
  @Output() setAsMain = new EventEmitter<any>();
  @Output() remove = new EventEmitter<any>();
  editMode: boolean = false;
  phoneForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.phoneForm = this.fb.group({
      id: [0],
      phoneNumber: ['', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['phone'] && changes['phone'].currentValue) {
      this.phoneForm.patchValue(this.phone);
    }
  }

  onSubmit(): void {
    this.save.emit(this.phoneForm.value);
    console.log(this.phoneForm.value);
    this.editMode = false;
    if (this.mode === 'create') {
      this.phoneForm.reset(new Phone(this.id, '', false));
    }
  }

  setPhoneAsMain(): void {
    this.setAsMain.emit(this.phone.id);
  }

  removePhone(): void {
    this.remove.emit(this.phone.id);
  }

  toggleEdit(): void {
    this.editMode = !this.editMode;
    this.reinitializeForm();
  }

  reinitializeForm(): void {
    this.phoneForm.patchValue(this.phone);
  }
}
