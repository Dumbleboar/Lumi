// modules
import * as React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Map } from 'immutable';

import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import SVGClose from 'material-ui/svg-icons/navigation/close';
import FilterBar from 'client/components/filter-bar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Divider from 'material-ui/Divider';
import { Tabs, Tab } from 'material-ui/Tabs';
import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import CreateOrAddUserDialog from './create_or_add_user_dialog';

// selectors
import { select_group } from 'client/state/groups/selectors';
import { get_users_by_group } from 'client/state/users/selectors';

// types
import { IState } from 'client/state';
import { ICollection } from 'lib/types';

// actions
import {
    get_group,
    delete_group,
    create_group,
    rem_collection_from_group
} from 'client/state/groups/actions';

interface IStateProps {
    collections: Array<ICollection>;
    group_id: string;
}

interface IDispatchProps {
    dispatch: (action) => void;
}

interface IProps extends IStateProps, IDispatchProps {}

interface IComponentState {
    show_dialog: boolean;
}

export default class AdminGroupCollections extends React.Component<
    IProps,
    IComponentState
> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            show_dialog: false
        };
    }

    public render() {
        return (
            <div>
                <List>
                    {this.props.collections.map(collection => (
                        <div>
                            <ListItem
                                leftAvatar={
                                    <Avatar>
                                        {collection.name.substring(0, 3)}
                                    </Avatar>
                                }
                                primaryText={collection.name}
                                rightIconButton={rightIconMenu([
                                    <MenuItem
                                        onClick={() =>
                                            this.props.dispatch(
                                                push(
                                                    '/admin/collections/' +
                                                        collection._id
                                                )
                                            )}
                                    >
                                        View
                                    </MenuItem>,
                                    <MenuItem
                                        onClick={() =>
                                            this.props.dispatch(
                                                rem_collection_from_group(
                                                    this.props.group_id,
                                                    collection._id
                                                )
                                            )}
                                    >
                                        Remove
                                    </MenuItem>
                                ])}
                            />
                            <Divider inset={true} />
                        </div>
                    ))}
                </List>
                <FloatingActionButton
                    onClick={() => {
                        this.props.dispatch(
                            push(
                                '/admin/groups/' +
                                    this.props.group_id +
                                    '/collections/add'
                            )
                        );
                    }}
                    style={{ margin: '20px' }}
                >
                    <ContentAdd />
                </FloatingActionButton>
            </div>
        );
    }
}

const iconButtonElement = (
    <IconButton touch={true} tooltip="more" tooltipPosition="bottom-left">
        <MoreVertIcon color={grey400} />
    </IconButton>
);

function rightIconMenu(menuItems) {
    return (
        <IconMenu iconButtonElement={iconButtonElement}>{menuItems}</IconMenu>
    );
}
