import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Person } from '../dtos/person_dto';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  
  updatePerson(person: Person): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation UpdatePerson($id: Int!, $nombres: String, $apellidoP: String, $apellidoM: String, $direccion: String, $telefono: String) {
          updatePerson(id: $id, nombres: $nombres, apellidoP: $apellidoP, apellidoM: $apellidoM, direccion: $direccion, telefono: $telefono) {
            id
            nombres
            apellidoP
            apellidoM
            direccion
            telefono
          }
        }
      `,
      variables: {
        id: person.id,
        nombres: person.nombres,
        apellidoP: person.apellidoP,
        apellidoM: person.apellidoM,
        direccion: person.direccion,
        telefono: person.telefono,
      },
    });
  }
  constructor(private apollo: Apollo) { }
  
  addPerson(person: Person): Observable<any> {
    const ADD_PERSON_MUTATION = gql`
      mutation AddPerson($nombres: String!, $apellidoP: String!, $apellidoM: String!, $direccion: String!, $telefono: String!) {
        addPerson(nombres: $nombres, apellidoP: $apellidoP, apellidoM: $apellidoM, direccion: $direccion, telefono: $telefono) {
          id
          nombres
          apellidoP
          apellidoM
          direccion
          telefono
        }
      }
    `;

    return this.apollo.mutate({
      mutation: ADD_PERSON_MUTATION,
      variables: {
        nombres: person.nombres,
        apellidoP: person.apellidoP,
        apellidoM: person.apellidoM,
        direccion: person.direccion,
        telefono: person.telefono,
      },
    });
  }


  getPersons(nombres?: string, apellidoP?: string, apellidoM?: string): Observable<any> {
    const GET_PERSONS = gql`
    query getPersons($nombres: String, $apellidoP: String, $apellidoM: String) {
      persons(nombres: $nombres, apellidoP: $apellidoP, apellidoM: $apellidoM) {
        id
        nombres
        apellidoP
        apellidoM
        direccion
        telefono
      }
    }`

    return this.apollo.watchQuery({
      query: GET_PERSONS,
      variables: {
        nombres: nombres || '',
        apellidoP: apellidoP || '',
        apellidoM: apellidoM || ''
      },
      fetchPolicy: 'network-only' // This disables cache for this specific query
    }).valueChanges;
  }

  deletePerson(id: number) {
    return this.apollo.mutate({
      mutation: gql`
        mutation DeletePerson($id: Int!) {
          deletePerson(id: $id)
        }
      `,
      variables: {
        id: id
      }
    });
  }
}
