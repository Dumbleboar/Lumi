import { Map } from 'immutable';
import { IState, IGroup, IGroupRef } from './types';
import { flatten } from 'lodash';

export function groups_list(state: IState): IGroup[] {
    return state.groups.map.toArray();
}

export function select_group(state: IState, group_id: string): IGroup {
    return state.groups.map.get(group_id, {
        _id: undefined,
        name: 'group ' + group_id + ' not found',
        type: 'group',
        auto_assign_collections: [],
        created_at: new Date()
    });
}

export function select_groups_for_user(
    state: IState,
    user_id: string
): IGroup[] {
    return select_groupref_for_user(state, user_id).groups.map(group_id =>
        select_group(state, group_id)
    );
}

export function select_groupref_for_user(
    state: IState,
    user_id: string
): IGroupRef {
    return state.groups.refs.get(user_id + '-groups', {
        user_id,
        _id: undefined,
        groups: [],
        type: 'group_ref'
    });
}

export function user_ids_for_group(state: IState, group_id: string): string[] {
    return state.groups.refs
        .toArray()
        .filter(ref => ref.groups.indexOf(group_id) > -1)
        .map(ref => ref.user_id);
}

export function user_ids_for_groups(
    state: IState,
    group_ids: string[]
): string[] {
    return flatten(group_ids.map(id => user_ids_for_group(state, id)));
}

export function selected_groups(state: IState): IGroup[] {
    return state.groups.ui.selected_groups.map(id => select_group(state, id));
}
