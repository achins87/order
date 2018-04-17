import React from 'react';
import {Category, Subcategory, Products} from './';
import {Menu, Segment} from 'semantic-ui-react';

export default class OrderMenu extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedCategory: null
		};
	}

	componentDidMount() {
		const {defaultCategory} = this.props.menu;
		this.selectCategory(defaultCategory);
	}

	selectCategory(selectedCategory) {
		this.setState({selectedCategory});
	}

	renderCategories() {
		const {categories} = this.props.menu;
		return Object.keys(categories).map((categoryId) => {
			const category = categories[categoryId];
			return (
				<Category key={categoryId} category={category} selectCategory={this.selectCategory.bind(this)} />
			);
		});
	}

	renderSubcategories() {
		const {addProduct, removeProduct, menu, items, getItemDiscount} = this.props;
		const {categories, subcategories, products} = menu;
		const {selectedCategory} = this.state;
		if (!selectedCategory) {
			return null;
		}

		return categories[selectedCategory].subcategories.map((subcategoryId) => {
			const subcategory = subcategories[subcategoryId];
			return (
				<Segment key={subcategoryId}>
					<Subcategory subcategory={subcategory} />
					<Products
						productIds={subcategory.products}
						products={products}
						items={items}
						addProduct={addProduct}
						removeProduct={removeProduct}
						getItemDiscount={getItemDiscount}
					/>
				</Segment>
			);
		});
	}

	render() {
		return (
			<div>
				<Menu>
					{this.renderCategories()}
				</Menu>
				{this.renderSubcategories()}
			</div>
		);
	}
}