import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../model/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as fromTodo from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styles: []
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @ViewChild('txtInputFisico', {static: false}) txtInputFisico: ElementRef;

  chkField: FormControl;
  txtInput: FormControl;
  editando = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.chkField = new FormControl(this.todo.completado);
    this.txtInput = new FormControl(this.todo.texto, Validators.required);

    this.chkField.valueChanges
    .subscribe( () => {
      const action = new fromTodo.ToggleTodoAction(this.todo.id);
      this.store.dispatch(action);
    });
  }

  editar(value: boolean) {
    this.editando = value;

    if (value) {
      setTimeout(() => this.txtInputFisico.nativeElement.select(), 1);
      return;
    }

    if (!this.txtInput.valid || this.txtInput.value === this.todo.texto) {
      return;
    }

    const action = new fromTodo.EditarTodoAction(this.todo.id, this.txtInput.value);
    this.store.dispatch(action);
  }

  borrar(id: number) {
    const action = new fromTodo.BorrarTodoAction(id);
    this.store.dispatch(action);
  }
}
