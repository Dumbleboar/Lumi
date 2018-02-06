// modules
import * as React from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';

import { AutoComplete } from 'material-ui';
import ChipInput from 'material-ui-chip-input';

import * as Groups from '../';

// actions
import {
    get_groups,
    get_user_groups,
    create_and_add_group,
    add_group,
    rem_group
} from 'lib/groups/actions';

interface IPassedProps {
    user_id: string;
}
interface IStateProps extends IPassedProps {
    groups: Map<string, Groups.IGroup>;
    user_groups: Groups.IGroup[];
}

interface IDispatchProps {
    dispatch: (action) => void;
}

interface IProps extends IStateProps, IDispatchProps {}

export class GroupsInputContainer extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);

        this.state = {};
    }

    public componentWillMount() {
        this.props.dispatch(get_user_groups(this.props.user_id));
    }

    public render() {
        return (
            <ChipInput
                hintText="Groups"
                floatingLabelText="Groups"
                className="filter-bar"
                fullWidth={true}
                value={this.props.user_groups}
                allowDuplicates={false}
                dataSource={this.props.groups.toArray()}
                dataSourceConfig={{
                    text: 'name',
                    value: '_id'
                }}
                openOnFocus={true}
                filter={AutoComplete.fuzzyFilter}
                onRequestAdd={group => {
                    this.props.groups.get(group._id)
                        ? this.props.dispatch(
                              add_group(this.props.user_id, group._id)
                          )
                        : this.props.dispatch(
                              create_and_add_group(
                                  this.props.user_id,
                                  group.name
                              )
                          );
                }}
                onRequestDelete={group_id =>
                    this.props.dispatch(rem_group(this.props.user_id, group_id))
                }
            />
        );
    }
}

function mapStateToProps(state: Groups.IState, ownProps): IStateProps {
    return {
        user_id: ownProps.user_id,
        user_groups: Groups.selectors.select_groups_for_user(
            state,
            ownProps.user_id
        ),
        groups: state.groups.map
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch: action => dispatch(action)
    };
}

export default connect<IStateProps, IDispatchProps, IPassedProps>(
    mapStateToProps,
    mapDispatchToProps
)(GroupsInputContainer);
