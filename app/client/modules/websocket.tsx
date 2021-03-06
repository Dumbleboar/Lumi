import * as React from 'react';
import { connect } from 'react-redux';
import * as socketio from 'socket.io-client';

// types
import { IState } from 'client/state';

// actions

declare var window;

interface IProps {
    dispatch: (action) => void;
}

export class WebsocketContainer extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }

    public componentDidMount() {
        const socket = socketio.connect({
            query: { jwt_token: window.localStorage.jwt_token }
        });

        socket.on('DB_CHANGE', msg => {
            const action = JSON.parse(msg);
            this.props.dispatch(action);
        });
    }

    public render() {
        return <div>{this.props.children}</div>;
    }
}

function mapStateToProps(state: IState, ownProps: {}) {
    return {};
}

function mapDispatchToProps(dispatch): IProps {
    return {
        dispatch: action => dispatch(action)
    };
}

export default connect<{}, {}, {}>(mapStateToProps, mapDispatchToProps)(
    WebsocketContainer
);
