// modules
import * as React 			from 'react';
import { connect } 			from 'react-redux';
import { push } 			from 'react-router-redux';

import { Map } 				from 'immutable';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import Chip 				from 'material-ui/Chip';

import FlatButton 			from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { List, ListItem } 	from 'material-ui/List';
import Subheader 			from 'material-ui/Subheader';
import Divider 				from 'material-ui/Divider';
import Avatar 				from 'material-ui/Avatar';
import Paper 				from 'material-ui/Paper';
import TextField 			from 'material-ui/TextField';
import ContentAdd 			from 'material-ui/svg-icons/content/add';
import SVGLeft 					from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import SVGRight 				from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import { 
	last, 
	first
} 	from 'lodash';
import {
	BottomNavigation,
	BottomNavigationItem,
} 							from 'material-ui/BottomNavigation';
import Multiplechoicecard 	from 'client/components/cards/multiplechoice';

// local
import { IState }  			from 'client/state';

// types
import { 
	ICollection,
	ICard
} 							from 'lib/types';

// selectors
import {
	select_card
}							from 'client/state/cards/selectors';
import {
	select_collection_by_id
}							from 'client/state/collections/selectors';
// actions
import {
	get_collection
}							from 'client/state/collections/actions';

interface IStateProps {
	collection: ICollection;
	collection_id: string;
	card: ICard;
}

interface IDispatchProps {
	dispatch: (action) => void;
}

interface IProps extends IStateProps, IDispatchProps {}

interface IComponentState {
	search_text?: string;
}

export class UserCollectionCard extends React.Component<IProps, IComponentState> {
	constructor(props: IProps) {
		super(props);

		this.state = {};
	}

	componentWillReceiveProps(nextProps: IProps) {
		if (this.props.collection_id !== nextProps.collection_id) {
			this.props.dispatch( get_collection( nextProps.collection_id ) );
		} 
	}

	public render() {
		return (
			<div>
				<Multiplechoicecard 
					text={this.props.card.text}
					items={this.props.card.items}
				/>
				<BottomNavigation style={{ position: 'fixed', bottom: '0px', left: '0px', right: '0px', zIndex: 501 }}>
						<BottomNavigationItem 
							style={{
								display: first(this.props.collection.cards) !== this.props.card._id ? 'block' : 'none'
							}} 
							onClick={() => this.props.dispatch( 
								push('/user/collections/' + this.props.collection._id + '/cards/' + 
								prev(this.props.collection.cards, this.props.card._id))
							)}
							icon={<SVGLeft />} 
						/>

						<BottomNavigationItem 
							style={{display: 
								last(this.props.collection.cards) !== this.props.card._id
								? 
								'block' : 'none'
							}} 
							onClick={() => this.props.dispatch( 
								push('/user/collections/' + this.props.collection._id + '/cards/' + 
								next(this.props.collection.cards, this.props.card._id))
							)}
							icon={<SVGRight />} 
						/>
					</BottomNavigation>
			</div>
		);
	}
}

function mapStateToProps(state: IState, ownProps): IStateProps {
	return {
		collection: select_collection_by_id(state, ownProps.params.collection_id),
		collection_id: ownProps.params.collection_id,
		card: select_card(state, ownProps.params.card_id )
	};
}

function mapDispatchToProps(dispatch) {
	return {
		dispatch: (action) => dispatch( action )
	};
}

export default connect<{}, {}, {}>(
	mapStateToProps,
	mapDispatchToProps,
)(UserCollectionCard);

function next(array: string[], id: string): string {
	let index = array.indexOf(id);
	index = index + 1;
	return array[ index ];
}

function prev(array: string[], id: string): string {
	let index = array.indexOf(id);
	index = index - 1;
	return array[ index ];
}