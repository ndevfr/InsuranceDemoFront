import {Component, EventEmitter, OnChanges, Input, Output, SimpleChanges} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Profile, ProfileType } from '../../models/user.model';

@Component({
  selector: 'app-user-form',
  imports: [ FormsModule,  ReactiveFormsModule, CommonModule ],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnChanges {
  editModeProfile: boolean = false;
  editModePassword: boolean = false;
  @Input() profile:ProfileType = new Profile('', '', '', '', '');
  @Output() changeProfile = new EventEmitter<any>();
  @Output() changePassword = new EventEmitter<any>();
  profileForm: FormGroup;
  passwordForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      email: [''],
    })
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['profile'] && changes['profile'].currentValue) {
      this.profileForm.patchValue(this.profile);
    }
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('newPassword')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmitPassword(): void {
    if (this.passwordForm.valid) {
      this.changePassword.emit(this.passwordForm.value);
      this.passwordForm.reset();
      this.editModePassword = false;
    }
  }

  onSubmitProfile(): void {
    if (this.profileForm.valid) {
      this.changeProfile.emit(this.profileForm.value);
      this.profileForm.reset();
      this.editModeProfile = false;
    }
  }

  toggleEditModeProfile(): void {
    this.editModeProfile = !this.editModeProfile;
  }

  toggleEditModePassword(): void {
    this.editModePassword = !this.editModePassword;
  }


}
