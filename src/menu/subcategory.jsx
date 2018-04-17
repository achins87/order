import React from 'react';
import {Header} from 'semantic-ui-react';

export default class Subcategory extends React.Component {
	render() {
		const {subcategory} = this.props;
		const {subcategoryName} = subcategory;
		return (
			<Header as='h2'>
				{subcategoryName}
			</Header>
		);
	}
}