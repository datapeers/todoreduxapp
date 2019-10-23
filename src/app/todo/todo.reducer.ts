import * as fromTodo from './todo.actions';
import { Todo } from './model/todo.model';

const todo1 = new Todo('Primer Tarea');
const todo2 = new Todo('Segunda Tarea');
const todo3 = new Todo('Tercer Tarea');

todo2.completado = true;

const estadoInicialTodo: Todo[] = [todo1, todo2, todo3];

export function todoReducer(state: Todo[] = estadoInicialTodo,
                            action: fromTodo.Acciones) {

        switch (action.type) {
            case fromTodo.AGREGAR_TODO: {
                const todo = new Todo(action.texto);
                return [...state, todo];
            }
            case fromTodo.TOGGLE_TODO: {
                return state.map( todoEdit => {
                    if (todoEdit.id === action.id) {
                        return {
                            ...todoEdit,
                            completado: !todoEdit.completado
                        };
                    } else {
                        return todoEdit;
                    }
                });
            }
            case fromTodo.TOGGLE_ALL_TODO: {
                return state.map( todoEdit => {
                    return {
                            ...todoEdit,
                            completado: action.completado
                }; });
            }
            case fromTodo.EDITAR_TODO: {
                return state.map( todoEdit => {
                    if (todoEdit.id === action.id) {
                        return {
                            ...todoEdit,
                            texto: action.texto
                        };
                    } else {
                        return todoEdit;
                    }
                });
            }
            case fromTodo.BORRAR_TODO: {
                return [...state.filter( todo => todo.id !== action.id)];
            }
            case fromTodo.BORRAR_COMPLETADOS_TODO: {
                return [...state.filter( todo => !todo.completado)];
            }
            default: return state;
        }
}
