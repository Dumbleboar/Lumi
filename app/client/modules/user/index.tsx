import * as React from 'react';
import { connect } from 'react-redux';

import * as shortid from 'shortid';
import { IState } from 'client/state';

// components
import AppBar from 'material-ui/AppBar';
import LeftDrawer from './left-drawer';

// actions
import {
    left_drawer_close,
    left_drawer_open,
    push
} from 'client/packages/ui/actions';

import { init } from 'client/packages/user/actions';

import { session_update } from 'client/packages/session/actions';

import { get_user_collections } from 'client/packages/collections/actions';

interface IStateProps {
    request: {};
    location;
}

interface IDispatchProps {
    dispatch: (action) => void;
}

interface IProps extends IStateProps, IDispatchProps {}

export class Root extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }

    public componentWillMount() {
        this.props.dispatch(get_user_collections());
    }

    public render() {
        return (
            <div id="root">
                <LeftDrawer />
                <div style={{ paddingBottom: '40px' }}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
function mapStateToProps(state: IState, ownProps): IStateProps {
    return {
        request: state.request,
        location: ownProps.location
    };
}

function mapDispatchToProps(dispatch): IDispatchProps {
    return {
        dispatch: action => dispatch(action)
    };
}

export default connect<{}, {}, {}>(mapStateToProps, mapDispatchToProps)(Root);