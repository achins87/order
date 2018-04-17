import React from 'react';
import {Menu, Products} from '../menu';
import {Container, Grid, Card, Button} from 'semantic-ui-react';

export default class Order extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			menu: null,
			discounts: [],
			discountedSubcategories: [],
			cart: {
				items: {},
				subtotal: 0,
				discount: 0,
				total: 0
			}
		};
	}

	fetchMenu() {
		fetch(`https://demo1017842.mockable.io/menu`).then((response) => {
			return response.json();
		}).then((response) => {
			const {menu} = response;
			this.setState({
				menu
			});
		})
	}

	componentDidMount() {
		this.fetchMenu();
	}

	addProduct(productId) {
		const {menu} = this.state;
		const {products} = menu;
		const {cart} = {...this.state};
		const quantity = cart.items[productId] ? cart.items[productId].quantity + 1 : 1;

		cart.items = {
			...cart.items,
			[productId]: {...products[productId], quantity}
		};

		this.setState({
			cart
		}, this.calculateCart());
	}

	removeProduct(productId) {
		const {menu} = this.state;
		const {products} = menu;
		const {cart} = {...this.state};
		const quantity = cart.items[productId] ? cart.items[productId].quantity - 1 : 0;

		if (quantity) {
			cart.items = {
				...cart.items,
				[productId]: {...products[productId], quantity}
			};
		} else {
			delete cart.items[productId];
		}

		this.setState({
			cart
		}, this.calculateCart());
	}

	getCategoryDiscount(categoryId) {
		const {categories} = this.state.menu;
		return categories[categoryId] ? categories[categoryId].discount : null;
	}

	getSubcategoryDiscount(subcategoryId) {
		const {subcategories} = this.state.menu;
		return subcategories[subcategoryId] ? subcategories[subcategoryId].discount : null;
	}

	getProductDiscount(productId) {
		const {products} = this.state.menu;
		return products[productId] ? products[productId].discount : null;
	}

	getItemDiscount(productId) {
		const {products} = this.state.menu;
		const {categoryId, subcategoryId} = products[productId];
		let discount = this.getProductDiscount(productId);
		if (!discount) {
			discount = this.getSubcategoryDiscount(subcategoryId);
		}
		if (!discount) {
			discount = this.getCategoryDiscount(categoryId);
		}

		return discount;
	}

	calculateCart() {
		const {cart} = {...this.state};
		let subtotal = 0;
		let discount = 0;
		let total = 0;

		Object.keys(cart.items).forEach((itemId) => {
			const item = cart.items[itemId];
			const itemDiscount = this.getItemDiscount(itemId);
			let itemDiscountValue = 0;
			let itemPrice = item.price*item.quantity;
			subtotal += itemPrice;
			if (itemDiscount) {
				switch (itemDiscount.type) {
					case "percentage":
						itemDiscountValue = item.quantity * item.price * (itemDiscount.value/100);
						break;
					case "value":
						itemDiscountValue = item.quantity * itemDiscount.value;
						break;
					default:
						break;
				}
			}
			item.totalPrice = itemPrice;
			item.discount = itemDiscountValue;
			total += itemPrice - itemDiscountValue;
			discount += itemDiscountValue;
		});

		cart.subtotal = subtotal;
		cart.total = total;
		cart.discount = discount;

		this.setState({
			cart
		});
	}

	render() {
		const {menu, cart} = this.state;
		if (!menu) {
			return null;
		}

		const {products} = menu;
		const itemIds = Object.keys(cart.items);
		return (
			<Container>
				<Grid>
					<Grid.Column width={12}>
						<Menu
							menu={menu}
							addProduct={this.addProduct.bind(this)}
							removeProduct={this.removeProduct.bind(this)}
							items={cart.items}
							getItemDiscount={this.getItemDiscount.bind(this)}
						/>
					</Grid.Column>
					<Grid.Column width={4}>
						<Card>
							<Card.Content>
								<Card.Header>Order Summary</Card.Header>
							</Card.Content>
							{itemIds.length ? [
								<Card.Content key={1}>
									<Products
										isCartItem
										productIds={itemIds}
										products={products}
										items={cart.items}
										addProduct={this.addProduct.bind(this)}
										removeProduct={this.removeProduct.bind(this)}
										getItemDiscount={this.getItemDiscount.bind(this)}
									/>
								</Card.Content>,
								<Card.Content extra key={2}>
									<Grid>
										<Grid.Row>
											<Grid.Column width={16}>Subtotal: {cart.subtotal}</Grid.Column>
											<Grid.Column width={16}>Discount: {cart.discount}</Grid.Column>
											<Grid.Column width={16}>Total: {cart.total}</Grid.Column>
										</Grid.Row>
									</Grid>
								</Card.Content>,
								<Card.Content key={3}>
									<Button fluid color="green">Confirm</Button>
								</Card.Content>
							] : (
								<Card.Content>No items in Cart</Card.Content>
							)}
						</Card>
					</Grid.Column>
				</Grid>
			</Container>
		);
	}
}