import { Action } from '@ngrx/store';

export const SET_FILTRO = '[Filter] Poner Filtro';

export type filtrosValidos = 'todos' | 'completados' | 'pendientes';

export class SetFilterAction implements Action {
    readonly type = SET_FILTRO;

    constructor(public filters: filtrosValidos) {}
}

export type Actions = SetFilterAction;
