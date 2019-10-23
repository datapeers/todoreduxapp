import * as fromFiltros from './filter.actions';

const estadoInicial: fromFiltros.filtrosValidos = 'todos';

export function filtroReducer(state = estadoInicial, action: fromFiltros.Actions): fromFiltros.filtrosValidos {
    switch (action.type) {
        case fromFiltros.SET_FILTRO: return action.filters;
        default: return state;
    }
}