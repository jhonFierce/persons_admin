import { createAction, props } from "@ngrx/store";
import { Person } from "../../dtos/person_dto";

export const loadPersons = createAction('[Person] Load Persons');
export const loadPersonsSuccess = createAction(
    '[Person] Load Persons Success',
    props<{ persons: Person[] }>()
  );
export const loadPersonsFailure = createAction(
    '[Person] Load Persons Failure',
    props<{ error: string }>()
);

// Define the addPerson action
export const addPerson = createAction(
  '[Person] Add Person',
  props<{ person: Person }>()  // Payload is the person to be added
);

// Optionally, you can add a success action
export const addPersonSuccess = createAction(
  '[Person] Add Person Success',
  props<{ person: Person }>()  // Payload is the added person from the server
);

// Define the updatePerson action
export const updatePerson = createAction(
  '[Person] Update Person',
  props<{ person: Person }>()  // Payload is the person to be updated
);

// Optionally, you can update a success action
export const updatePersonSuccess = createAction(
  '[Person] Update Person Success',
  props<{ person: Person }>()  // Payload is the updated person from the server
);

// Delete person action
export const deletePerson = createAction(
  '[Person] Delete Person',
  props<{ id: number }>()
);

export const deletePersonSuccess = createAction(
  '[Person] Delete Person Success',
  props<{ id: number }>()
);

export const deletePersonFailure = createAction(
  '[Person] Delete Person Failure',
  props<{ error: any }>()
);