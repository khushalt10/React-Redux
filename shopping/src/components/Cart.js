import React, { Component } from 'react'
import formatCurrency from '../util';

export default class Cart extends Component {
 
    constructor() {
        super();

        this.state = {
            name:"",
            email:"",
            address: "",
            showCheckout: false,
        }
    }

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value})
        alert(e.target.value)
    }

    crateOrder = (e) => {
        e.preventDefault();
        const order = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            cartItems: this.props.cartItems,
        };
        this.props.createOrder(order);
        console.log(order)
    }

    render() {
        const {cartItems} = this.props;
        return (
            <>
            <div>
                {cartItems.length === 0 ? <div className="cart cart-header">Cart Is Empty!!</div>
                : 
             <div className="cart cart-header">You have {cartItems.length} items in the cart{" "}</div>}
            </div>
            <div>
                <div className="cart">
                    <ul className="cart-items">
                        {cartItems.map(item => (
                            <li key={item._id}>
                                <div>
                                    <img src={item.image} alt={item.title}/>
                                </div>
                                <div>
                                    <div>{item.title}</div>
                                    <div className="right">
                                        {formatCurrency(item.price)} x {item.count} {" "}
                                    <button className="button" onClick={()=> this.props.removeFromCart(item)}>
                                        Remove
                                    </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                {cartItems.length !== 0 && (
                  <div>  
                    <div className="cart">
                        <div className="total">
                            <div>
                                Total:{" "}{formatCurrency(cartItems.reduce((a,c) => a + c.price * c.count, 0))}
                            </div>
                            <div>
                                <button onClick={() => {this.setState({showCheckout: true})}} className="button primary">Proceed</button>    
                            </div>
                        </div>
                    </div>
                    {this.state.showCheckout && (
                        <div className="cart">
                            <form onSubmit={this.createOrder}>
                                <ul className="form-container">
                                    <li>
                                        <label htmlFor="">Email</label>
                                        <input 
                                            type="email"
                                            required
                                            name="email"
                                            onChange={this.hanleInput}
                                        />
                                    </li>
                                    <li>
                                        <label htmlFor="">Name</label>
                                        <input 
                                            type="text"
                                            name="name"
                                            required
                                            onChange={this.hanleInput}
                                        />
                                    </li><li>
                                        <label htmlFor="">Address</label>
                                        <input 
                                            type="text"
                                            name="address"
                                            required
                                            onChange={this.hanleInput}
                                        />
                                    </li>
                                    <li>
                                        <button type="submit" className="button primary">Checkout</button>
                                    </li>
                                </ul>
                            </form>
                        </div>
                    
                    )}
                    </div>
                )}
                
            </div>
        </>
        )
    }
}
