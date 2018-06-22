import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';

import { User, Query } from '../../types';

@Injectable()
export class UserService {
    users: Observable<User[]>;
    constructor(
        private http: HttpClient,
        private apollo: Apollo
    ) { }

    getAll() {
        this.users = this.apollo.watchQuery<Query>(
            {
                query: gql`
                  query allUsers {
                    allUsers {
                        id
                        username
                        password
                        firstName
                        lastName
                        email
                        cpf
                    }
                  }
                `
            })
            .valueChanges
            .pipe(
                map(result => result.data.allUsers)
            );
        return this.users;
    }

    getById(id: number) {
        return this.http.get('/api/users/' + id);
    }

    create(user: User) {
        return this.http.post('/api/users', user);
    }

    update(user: User) {
        return this.http.put('/api/users/' + user.id, user);
    }

    delete(id: number) {
        return this.http.delete('/api/users/' + id);
    }
}