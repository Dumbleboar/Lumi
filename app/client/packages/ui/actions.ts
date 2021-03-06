import { push as _push } from 'react-router-redux';
import * as qs from 'query-string';
import * as url_parse from 'url-parse';
import * as debug from 'debug';

import { session_update } from '../session/actions';
import {
    UI_DIALOG_CLOSE,
    UI_DIALOG_OPEN,
    UI_LEFT_DRAWER_CLOSE,
    UI_OPEN_LEFT_DRAWER,
    UI_RIGHT_DRAWER_CLOSE,
    UI_RIGHT_DRAWER_OPEN,
    UI_SNACKBAR_OPEN,
    UI_SNACKBAR_CLOSE,
    UI_TOGGLE_CARDS_DIALOG,
    UI_SELECT_CARD
} from '../action-types';

export function push(url: string) {
    return dispatch => {
        dispatch(left_drawer_close());
        dispatch(_push(url));
        // dispatch( session_update({ location: url }) );
    };
}

export function select_card(card_id: string) {
    return {
        card_id,
        type: UI_SELECT_CARD
    };
}

export function snackbar_open(text: string) {
    return {
        type: UI_SNACKBAR_OPEN,
        payload: { text }
    };
}

export function toggle_cards_dialog() {
    return {
        type: UI_TOGGLE_CARDS_DIALOG
    };
}
export function dialog_open() {
    return {
        type: UI_DIALOG_OPEN
    };
}

export function dialog_close() {
    return {
        type: UI_DIALOG_CLOSE
    };
}
export function left_drawer_open() {
    return {
        type: UI_OPEN_LEFT_DRAWER
    };
}

export function left_drawer_close() {
    return {
        type: UI_LEFT_DRAWER_CLOSE
    };
}

export function right_drawer_open() {
    return {
        type: UI_RIGHT_DRAWER_OPEN
    };
}

export function right_drawer_close() {
    return {
        type: UI_RIGHT_DRAWER_CLOSE
    };
}
