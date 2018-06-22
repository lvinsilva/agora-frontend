import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services';
import { User } from './../../../types';
import { first } from 'rxjs/operators';

declare var $: any;

@Component({
  selector: 'app-users-list',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  usersList: User[] = [];

  dataTable: any;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadAllUsers();

    const table: any = $('#usersListTbl');
    const data: any = this.usersList;
    let editor;

    $(function () {
      table.DataTable({
        data: data,
        columns: [
          { title: 'ID' },
          { title: 'Nome' },
          { title: 'Sobrenome' },
          { title: 'Username' },
          { title: 'Email' },
          { title: 'CPF' }
        ],
        select: true,
        buttons: [
          { extend: 'create', editor: editor },
          { extend: 'edit', editor: editor },
          { extend: 'remove', editor: editor }
        ]
      });
    });
  }

  private loadAllUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.usersList = users;
    });
  }
}
