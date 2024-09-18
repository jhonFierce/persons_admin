import { createReducer, on } from "@ngrx/store";
import { addPerson, addPersonSuccess, deletePersonSuccess, loadPersons, loadPersonsSuccess, updatePersonSuccess } from "../actions/person.actions";
import { Person } from "../../dtos/person_dto";

export interface PersonState {
  persons: Person[];  // Define the type for 'persons'
  error: string | null;
}

export const initialState: PersonState = {
    persons: [],
    error: null
  };

export const personReducer = createReducer(
  initialState,
  on(loadPersons, (state) => ({ ...state })),
  on(loadPersonsSuccess, (state, { persons }) => ({
    ...state,
    persons: persons,
  })),
  on(addPerson, (state) => ({
    ...state,
    // Optionally you can set a loading flag here
    // loading: true,
  })),
  // Handle the addPersonSuccess action to update the state
  on(addPersonSuccess, (state, { person }): PersonState => ({
    ...state,
    persons: [...state.persons, person],
  })),
  on(updatePersonSuccess, (state, { person }) => ({
    ...state,
    persons: state.persons.map(p => p.id === person.id ? person : p)
  })),
  // Handle deletePersonSuccess action
  on(deletePersonSuccess, (state, { id }) => ({
    ...state,
    persons: state.persons.filter(person => person.id !== id)
  }))
);