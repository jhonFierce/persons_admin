import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from '../../dtos/person_dto';

@Component({
  selector: 'app-person-dialog',
  templateUrl: './person-dialog.component.html',
  styleUrls: ['./person-dialog.component.scss']
})
export class PersonDialogComponent {
  personForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<PersonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Person ,
    private fb: FormBuilder
  ) {
    
    // Initialize the form group, prefill the data if editing a person
    this.personForm = this.fb.group({
      nombres: [data?.nombres || '', Validators.required],
      apellidoP: [data?.apellidoP || '', Validators.required],
      apellidoM: [data?.apellidoM || '', Validators.required],
      direccion: [data?.direccion || '', Validators.required],
      telefono: [data?.telefono || '', Validators.required],
    });
  }

  // Close the dialog and return the form data
  onSave(): void {
    if (this.personForm.valid) {
      this.dialogRef.close(this.personForm.value);
    }
  }

  // Cancel the dialog
  onCancel(): void {
    this.dialogRef.close();
  }
}