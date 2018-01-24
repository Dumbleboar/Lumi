// modules
import * as React from 'react';
import { connect } from 'react-redux';
import * as debug from 'debug';
import { assign, noop } from 'lodash';

import { convert_attachment_url } from '../utils';

// components
import TextCardComponent from '../components/text-card-component';

// types
import { ITextCard, ITextCardData, IState } from '../types';

// selectors
import { select_card } from 'lib/cards/selectors';
import { select_data, select_collection } from 'lib/data/selectors';

// actions
import { create_data, update_data, get_data } from 'lib/data/actions';
import { get_card, update_card } from 'lib/cards/actions';

// modules
import * as Data from 'lib/data';

const log = debug('lumi:packages:cards:container:multiplechoice-card');

interface IPassedProps {
    card_id: string;
    collection_id: string;
    user_id?: string;
}

interface IStateProps extends IPassedProps {
    card: ITextCard;
    data: ITextCardData;
}

interface IDispatchProps {
    dispatch: (action) => any;
}

interface IProps extends IStateProps, IDispatchProps {}

export class TextCardContainer extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);

        this.log = this.log.bind(this);
    }

    public log(msg: string) {
        log(msg);
        this.setState({ status: msg });
    }

    public componentWillMount() {
        this.log('checking for data');
        this.props
            .dispatch(
                Data.actions.get_card_data(
                    this.props.user_id,
                    this.props.collection_id,
                    this.props.card_id
                )
            )
            .then(res => {
                if (res.response.status === 404) {
                    this.log('no data found. creating..');
                    this.props
                        .dispatch(
                            create_data<ITextCardData>({
                                _id:
                                    this.props.user_id +
                                    '-' +
                                    this.props.collection_id +
                                    '-' +
                                    this.props.card_id,
                                type: 'data',
                                user_id: undefined,
                                created_at: undefined,
                                updated_at: undefined,
                                score: 0,
                                card_type: 'text',
                                data_type: 'card',
                                is_graded: false,
                                card_id: this.props.card._id,
                                collection_id: this.props.collection_id
                            })
                        )
                        .then(create_res => {
                            this.log('data created.');
                            this.setState({ loading: false });
                        });
                } else {
                    this.log('data found.');
                    this.setState({ loading: false });
                }
            });
    }

    public render() {
        const { card, data } = this.props;

        if (card && data) {
            const text = convert_attachment_url(card.text, card._id);

            return <TextCardComponent text={this.props.card.text} />;
        }

        return <div>loading</div>;
    }
}

function mapStateToProps(state: IState, ownProps): IStateProps {
    const user_id = ownProps.user_id || (state as any).auth.user_id;

    return {
        user_id,
        card_id: ownProps.card_id,
        collection_id: ownProps.collection_id,
        card: select_card(state, ownProps.card_id) as ITextCard,
        data: select_data(
            state,
            user_id,
            ownProps.collection_id,
            ownProps.card_id
        ) as ITextCardData
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
)(TextCardContainer);
