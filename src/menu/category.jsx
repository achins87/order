import React from 'react';
import {Menu} from 'semantic-ui-react';

export default class Category extends React.Component {
	render() {
		const {selectCategory, category} = this.props;
		const {categoryId, categoryName} = category;
		return (
			<Menu.Item onClick={() => selectCategory(categoryId)}>
				{categoryName}
			</Menu.Item>
		);
	}
}