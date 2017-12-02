import * as React from 'react';
import { connect } from 'react-redux';
import * as shortid from 'shortid';

// types
import { Dispatch } from 'redux';
import { IState } from 'client/state';

// actions
import { push } from 'react-router-redux';

declare var window;

interface IProps {
    dispatch: (action) => void;
}

export class WebsocketContainer extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }

    public componentWillMount() {
        const socket = new WebSocket(
            'ws://' + window.location.hostname + ':8081/',
            window.localStorage.jwt_token
        );
        socket.onmessage = msg => {
            const action = JSON.parse(msg.data);
            this.props.dispatch(action);
        };
    }

    public render() {
        return <div>{this.props.children}</div>;
    }
}

function mapStateToProps(state: IState, ownProps: {}) {
    return {};
}

function mapDispatchToProps(dispatch: Dispatch<{}>): IProps {
    return {
        dispatch: action => dispatch(action)
    };
}

export default connect<{}, {}, {}>(mapStateToProps, mapDispatchToProps)(
    WebsocketContainer
);