import React from 'react';
import {Grid, Menu, Item, Label} from 'semantic-ui-react';

export default class Product extends React.Component {
	renderDiscount() {
		const {product, getItemDiscount} = this.props;
		const {productId} = product;
		const discount = getItemDiscount ? getItemDiscount(productId) : null;

		if (discount) {
			return  <Label>{discount.type === "percentage" ? `${discount.value} % OFF` : `INR ${discount.value} OFF`}</Label>
		}
		return null;
	}
	render() {
		const {addProduct, removeProduct, product, addedItem, isCartItem} = this.props;
		const {productName, productId, price} = product;
		return (
			<Grid>
				<Grid.Column width={10}>
				<Item>
					<Item.Content>
						<Item.Header>{productName}</Item.Header>
						<Item.Meta>{price}{isCartItem ? ` x ${addedItem.quantity} = ${addedItem.totalPrice}` : this.renderDiscount()}</Item.Meta>
						<Item.Meta>
							{isCartItem && addedItem.discount ? `Discount: ${addedItem.discount}` : ''}
						</Item.Meta>
					</Item.Content>
				</Item>
					
				</Grid.Column>
				<Grid.Column width={6}>
					<Menu floated="right" compact size="mini">
						<Menu.Item onClick={() => removeProduct(productId)}>-</Menu.Item>
						<Menu.Item color={addedItem ? 'green' : 'grey'} active={addedItem ? true : false} >{addedItem ? addedItem.quantity : 0}</Menu.Item>
						<Menu.Item onClick={() => addProduct(productId)}>+</Menu.Item>
					</Menu>
				</Grid.Column>
			</Grid>
		);
	}
}