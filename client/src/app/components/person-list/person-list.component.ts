import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { addPerson, deletePerson, loadPersons, updatePerson } from '../../store/actions/person.actions';
import { PersonService } from '../../services/person.service';
import { selectPersons } from '../../store/selectors/person.selectors';
import { Person } from '../../dtos/person_dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PersonDialogComponent } from '../person-dialog/person-dialog.component';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.scss'
})
export class PersonListComponent implements OnInit {
  persons: Person[] = [];
  filter: any = { nombres: '', apellidoP: '', apellidoM: '' };
  displayedColumns: string[] = ['nombres', 'apellidoP', 'apellidoM', 'direccion', 'telefono', 'actions'];

  personForm!: FormGroup;
  showForm: boolean = false;  // To toggle form visibility
  selectedPerson: any = null; // Store the selected person for updating/deleting

  constructor(private store: Store<any>, private personService: PersonService, private fb: FormBuilder, private dialog: MatDialog) {
    this.personForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidoP: ['', Validators.required],
      apellidoM: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.store.dispatch(loadPersons());  // Load persons
    this.store.select(selectPersons).subscribe((data) => {
      console.log(data);
      
      this.persons = data;
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(PersonDialogComponent, {
      width: '400px',
      data: { person: null }  // Pass null for adding a new person
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Dispatch action to add the new person
        this.store.dispatch(addPerson({ person: result }));
      }
    });
  }

  openEditDialog(person: Person) {
    // Logic to open edit person dialog
    const dialogRef = this.dialog.open(PersonDialogComponent, {
      width: '400px',
      data: person
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(updatePerson({ person: {...result, id:  person.id} }));
      }
    });
  }

  onDeletePerson(person: Person) {
      let text = `¡Esta seguro de borrar este usuario!\n${person.nombres+"\n"+person.apellidoP+"\n"+person.apellidoP+"\n"+person.direccion+"\n"+person.telefono}.`;
      if (confirm(text) == true) {
        this.store.dispatch(deletePerson({ id: person.id }));
      } else {
        text = "Cancelaste!";
      }
  }

  onFilterChange(): void {
    this.personService
      .getPersons(this.filter.nombres, this.filter.apellidoP, this.filter.apellidoM)
      .subscribe((response) => {
        this.persons = response.data.persons;
      });
  }

  // Method to handle form submission (adding a new person)
  onSubmit(): void {
    if (this.personForm.valid) {
      const newPerson:Person = this.personForm.value;
      this.store.dispatch(addPerson({ person: newPerson }));
      this.personForm.reset();
      this.showForm = false;
    }
  }
}
