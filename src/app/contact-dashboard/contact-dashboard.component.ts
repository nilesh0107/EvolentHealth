import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { contactModal } from './contact-dashboard.modal';

@Component({
  selector: 'app-contact-dashboard',
  templateUrl: './contact-dashboard.component.html',
  styleUrls: ['./contact-dashboard.component.scss']
})
export class ContactDashboardComponent implements OnInit {

  formValue !: FormGroup;
  contactModalObj: contactModal = new contactModal();
  contactList !: any;
  showAdd: boolean = true;
  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      phoneNumber: [''],
      status: ['Active']
    });
    this.getAllContacts();
  }

  AddContact() {
    this.formValue.reset();
    this.formValue.controls['status'].setValue('Active');
    this.showAdd = true;
  }

  postContactDetails() {
    this.contactModalObj.firstName = this.formValue.value.firstName;
    this.contactModalObj.lastName = this.formValue.value.lastName;
    this.contactModalObj.email = this.formValue.value.email;
    this.contactModalObj.phoneNumber = this.formValue.value.phoneNumber;
    this.contactModalObj.status = this.formValue.value.status;
    if (this.contactModalObj.firstName !== '' && this.contactModalObj.lastName !== '' &&
      this.contactModalObj.email !== '' && this.contactModalObj.phoneNumber !== '' &&
      this.contactModalObj.status !== '') {
      this.api.postContact(this.contactModalObj)
        .subscribe(res => {
          console.log(res);
          document.getElementById('cancel')?.click();
          this.formValue.reset();
          this.formValue.controls['status'].setValue('Active');
          this.getAllContacts();
        },
          err => {
            console.log(err);
            alert('Something went wrong, please try again after sometime.')
          });
    } else {
      alert('All fields are mandatory.')
    }

  }

  getAllContacts() {
    this.api.getContact()
      .subscribe(res => {
        this.contactList = res;
      });
  }

  deleteContact(contact: any) {
    this.api.deleteContact(contact.id)
      .subscribe(res => {
        console.log(res);
        this.getAllContacts();
      })
  }

  onEdit(contact: any) {
    this.showAdd = false;
    this.contactModalObj.id = contact.id;
    this.formValue.controls['firstName'].setValue(contact.firstName);
    this.formValue.controls['lastName'].setValue(contact.lastName);
    this.formValue.controls['email'].setValue(contact.email);
    this.formValue.controls['phoneNumber'].setValue(contact.phoneNumber);
    this.formValue.controls['status'].setValue(contact.status);
  }

  updateContactDetails() {
    this.contactModalObj.firstName = this.formValue.value.firstName;
    this.contactModalObj.lastName = this.formValue.value.lastName;
    this.contactModalObj.email = this.formValue.value.email;
    this.contactModalObj.phoneNumber = this.formValue.value.phoneNumber;
    this.contactModalObj.status = this.formValue.value.status;

    if (this.contactModalObj.firstName !== '' && this.contactModalObj.lastName !== '' &&
      this.contactModalObj.email !== '' && this.contactModalObj.phoneNumber !== '' &&
      this.contactModalObj.status !== '') {
      this.api.updateContact(this.contactModalObj, this.contactModalObj.id)
        .subscribe(res => {
          console.log(res);
          document.getElementById('cancel')?.click();
          this.formValue.reset();
          this.formValue.controls['status'].setValue('Active');
          this.getAllContacts();
        },
          err => {
            console.log(err);
            alert('Something went wrong, please try again after sometime.')
          });
    } else {
      alert('All fields are mandatory.')
    }
  }

  updateContactStatus(contact: any) {
    this.contactModalObj = contact;
    if (this.contactModalObj.status === 'Active') {
      this.contactModalObj.status = 'Inactive'
    } else {
      this.contactModalObj.status = 'Active'
    }
    this.api.updateContact(this.contactModalObj, this.contactModalObj.id)
      .subscribe(res => {
        console.log(res);
        document.getElementById('cancel')?.click();
        this.formValue.reset();
        this.formValue.controls['status'].setValue('Active');
        this.getAllContacts();
      },
        err => {
          console.log(err);
          alert('Something went wrong, please try again after sometime.')
        });
  }
}
