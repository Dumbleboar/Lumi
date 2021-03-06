import * as React from 'react';
import { connect } from 'react-redux';

// material-ui
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

// material-ui -> icons
import SVGClose from 'material-ui/svg-icons/navigation/close';
import SVGPower from 'material-ui/svg-icons/action/power-settings-new';

// actions
import {
    push,
    left_drawer_close,
    left_drawer_open
} from 'client/packages/ui/actions';

import { logout } from 'client/packages/auth/actions';

// selector
import { select_collections_as_array } from 'client/packages/collections/selectors';

// types
import { ICollection } from 'common/types';
import { IState } from 'client/state';

declare var process;

interface IStateProps {
    left_drawer_show: boolean;
    collections: ICollection[];
}

interface IDispatchProps {
    push: (url: string) => void;
    dispatch: (action) => void;
}

interface IProps extends IStateProps, IDispatchProps {}

export class UserLeftDrawer extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);

        this.state = {};
    }

    public render() {
        return (
            <div>
                <Drawer
                    docked={false}
                    open={this.props.left_drawer_show}
                    onRequestChange={() =>
                        this.props.dispatch(left_drawer_close())
                    }
                    containerStyle={{ backgroundColor: '#FFFFFF' }}
                >
                    <AppBar
                        showMenuIconButton={true}
                        iconElementLeft={
                            <IconButton>
                                <SVGClose />
                            </IconButton>
                        }
                        onLeftIconButtonTouchTap={() =>
                            this.props.dispatch(left_drawer_close())
                        }
                    />

                    <List>
                        {this.props.collections.map(c => (
                            <ListItem
                                key={c._id}
                                primaryText={c.name}
                                onClick={() =>
                                    this.props.dispatch(
                                        push(
                                            '/user/collections/' +
                                                c._id +
                                                '/cards'
                                        )
                                    )
                                }
                            />
                        ))}
                        <Subheader>User</Subheader>
                        <ListItem
                            primaryText="Logout"
                            leftIcon={<SVGPower />}
                            onClick={() => this.props.dispatch(logout())}
                        />
                        <Divider />
                        <Subheader>{'Lumi v' + process.env.VERSION}</Subheader>
                    </List>
                </Drawer>
            </div>
        );
    }
}

function mapStateToProps(state: IState, ownProps: {}): IStateProps {
    return {
        left_drawer_show: state.ui.left_drawer_show,
        collections: select_collections_as_array(state)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch: action => dispatch(action)
    };
}

export default connect<{}, {}, {}>(mapStateToProps, mapDispatchToProps)(
    UserLeftDrawer
);
