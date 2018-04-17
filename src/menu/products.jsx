import React from 'react';
import {Product} from './';
import {Divider} from 'semantic-ui-react';

export default class Products extends React.Component {
	render() {
		const {productIds, products, items, addProduct, removeProduct, isCartItem, getItemDiscount} = this.props;

		return productIds.map((productId, key) => {
			const product = products[productId];
			return (
				<div key={productId}>
					<Product
						isCartItem={isCartItem}
						product={product}
						addedItem={items[productId]}
						addProduct={addProduct}
						removeProduct={removeProduct}
						getItemDiscount={getItemDiscount}
					/>
					{key !== productIds.length - 1 ? <Divider /> : null}
				</div>
			);
		})
	}
}