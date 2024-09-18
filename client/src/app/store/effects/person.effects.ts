import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap } from "rxjs/operators";
import { addPerson, addPersonSuccess, deletePerson, deletePersonFailure, deletePersonSuccess, loadPersons, loadPersonsSuccess, updatePerson, updatePersonSuccess } from "../actions/person.actions";
import { of } from "rxjs";
import { PersonService } from "../../services/person.service";
import { Person } from "../../dtos/person_dto";

@Injectable()
export class PersonEffects {
  loadPersons$: any;
  addPerson$: any;
  updatePerson$: any;
  deletePerson$: any;

  constructor(private actions$: Actions, private personService: PersonService) {
      
    this.loadPersons$ = createEffect(() =>
      this.actions$.pipe(
        ofType(loadPersons),
        mergeMap(() =>
          this.personService.getPersons().pipe(
            map((data) => loadPersonsSuccess({ persons: data.data.persons })),
            catchError((error) => of({ type: '[Person] Load Persons Failure', error }))
          )
        )
      )
    );

      // Effect for adding a new person
    this.addPerson$ = createEffect(() =>
      this.actions$.pipe(
        ofType(addPerson),
        mergeMap((action) =>
          this.personService.addPerson(action.person).pipe(
            map(({data}) => addPersonSuccess({ person: data.addPerson })),
            catchError((error) => of({ type: '[Person] Add Person Failure', error }))
          )
        )
      )
    );

    this.updatePerson$ = createEffect(() =>
      this.actions$.pipe(
        ofType(updatePerson),
        mergeMap(action =>
          this.personService.updatePerson(action.person).pipe(
            map(({data}) => updatePersonSuccess({ person: data.updatePerson })),
            catchError(error => of({ type: '[Person] Update Person Failure', error }))
          )
        )
      )
    );

      // Effect for deleting a person
    this.deletePerson$ = createEffect(() =>
      this.actions$.pipe(
        ofType(deletePerson),
        mergeMap((action) =>
          this.personService.deletePerson(action.id).pipe(
            map(() => deletePersonSuccess({ id: action.id })),
            catchError((error) => of(deletePersonFailure({ error })))
          )
        )
      )
    );
  }
}