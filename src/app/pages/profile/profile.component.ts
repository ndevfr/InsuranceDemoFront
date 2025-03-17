import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddressFormComponent } from '../../components/address-form/address-form.component';
import { PhoneFormComponent } from '../../components/phone-form/phone-form.component';
import { UserFormComponent } from '../../components/user-form/user-form.component';


import { AddressType } from '../../models/address.model';
import { PhoneType } from '../../models/phone.model';
import { ProfileType } from '../../models/user.model';
import { PasswordType } from '../../models/user.model';

import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  imports: [ CommonModule, FormsModule, AddressFormComponent, PhoneFormComponent, UserFormComponent ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent implements OnInit {
  user: any = {};
  phones: any[] = [];
  addresses: any[] = [];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.loadProfil();
    this.loadPhones();
    this.loadAddresses();
  }

  loadProfil(): void {
    this.userService.getUser().subscribe(data => {
      this.user = data;
    });
  }

  loadPhones(): void {
    this.userService.getPhones().subscribe(data => {
      this.phones = data.map((phone: PhoneType, index) => {
        phone.id = index+1;
        return phone;
      });
    });
  }

  loadAddresses(): void {
    this.userService.getAddresses().subscribe(data => {
      this.addresses = data.map((address: AddressType, index) => {
        address.id = index+1;
        return address;
      });
    });
  }

  changeProfile(profile: ProfileType): void {
    this.userService.updateUser(profile).subscribe(() => {
      this.loadProfil();
    });
  }

  changePassword(password: PasswordType): void {
    this.userService.updatePassword(password).subscribe(() => {
      this.loadProfil();
    });
  }

  addPhone(phone: any): void {
    this.userService.addPhone(phone).subscribe(() => {
      this.loadPhones();
    });
  }

  updatePhone(phone: any): void {
    this.userService.updatePhone(phone).subscribe(() => {
      this.loadPhones();
    });
  }

  setPhoneAsMain(phoneId: number): void {
    this.userService.setPhoneAsMain(phoneId).subscribe(() => {
      this.loadPhones();
    });
  }

  deletePhone(phoneId: number): void {
    this.userService.deletePhone(phoneId).subscribe(() => {
      this.loadPhones();
    });
  }

  addAddress(address: any): void {
    this.userService.addAddress(address).subscribe(() => {
      this.loadAddresses();
    });
  }

  updateAddress(address: any): void {
    this.userService.updateAddress(address).subscribe(() => {
      this.loadAddresses();
    });
  }

  deleteAddress(addressId: number): void {
    this.userService.deleteAddress(addressId).subscribe(() => {
      this.loadAddresses();
    });
  }

  setAddressAsMain(addressId: number): void {
    this.userService.setAddressAsMain(addressId).subscribe(() => {
      this.loadAddresses();
    });
  }
}
