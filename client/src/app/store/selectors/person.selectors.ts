import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PersonState } from '../reducers/person.reducer';

// Select the 'person' state
const selectPersonState = createFeatureSelector<PersonState>('person');

// Create a selector for the persons array
export const selectPersons = createSelector(
  selectPersonState,
  (state: PersonState) => state.persons
);