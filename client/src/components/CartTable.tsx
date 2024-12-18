import "../assets/css/Carttable.css";
import {BookItem, initialCartState, ShoppingCartItem} from "../types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronLeft,
    faChevronRight,
    faMinusCircle,
    faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";

import { useContext } from "react";
import {activeCategoryKey, CartStore } from "../contexts/CartContext";
import { CartTypes } from "../reducers/CartReducer";
import {Link} from "react-router-dom";
import {asDollarsAndCents} from "./utils";


function CartTable() {


    const bookImageFileName = (bookTittle: string) => {
        let name = bookTittle.toLowerCase().replace(/ /g, "-").replace(/'/g, "");
        console.log(name);
        name = `${name}.png`;
        try {
            return require('../assets/images/books/' + name);
        } catch (_) {
            return require('../assets/images/books/bewitched.png');
        }


    };




    const { cart, dispatch } = useContext(CartStore);

    const addBookToCart = (book: BookItem) => {
        // @ts-ignore
        dispatch({ type: CartTypes.ADD, item: book, id: book.bookId });
    };

    const removeBookFromCart = (book: BookItem) => {
        // @ts-ignore
        dispatch({ type: CartTypes.REMOVE, item: book, id: book.bookId });
    };

    const clearCart = () => {
        // @ts-ignore
        dispatch({ type: CartTypes.CLEAR });
    }

    {console.log(cart)}
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return  cart.length > 0 ? (
        <div style={{
            minHeight: '86.1vh',
            minWidth: '1200px'
        }}>

            <div className="Cart">
                <div className="cartier">
                    <div className="cart-table">
                        <ul className="cart2">
                            <li className="table-heading">
                                <div className="heading-book">Book</div>
                                <div className="heading-price">Price</div>
                                <div className="heading-quantity">Quantity</div>
                                <div className="heading-subtotal">Amount</div>
                            </li>
                            {/* TODO : You need to iterate through the cart and display book image, */}
                            {/*        Book Title, unit price/quantity and total price for each item in the cart*/}
                            {/*        Note that the following simply display hardcoded data*/}


                            <li className="line-sep"></li>
                            {cart.map((book: any) => (


                                <li key={book.bookId}>

                                    <div className="cart-book-image">

                                        <img
                                            src={bookImageFileName(book.items.title)}
                                            alt={book.items.title}
                                            className="book-image"
                                        />
                                    </div>
                                    <div className="cart-book-title">{book.items.title}</div>
                                    <div className="cart-book-price">${book.items.price.toFixed(2)}</div>
                                    <div className="cart-book-quantity">
                                        <button
                                            className="icon-button dec-arrow-button"
                                            onClick={() => addBookToCart(book.items)}
                                        >
                                            <i className="fa-solid fa-square-plus"></i>
                                        </button>
                                        <span className="quantity">{book.quantity}</span>
                                        <button
                                            className="icon-button inc-arrow-button"
                                            onClick={() => removeBookFromCart(book.items)}
                                        >

                                            <i className="fa-solid fa-square-minus"></i>
                                        </button>
                                    </div>
                                    <div className="cart-book-subtotal"><p
                                        className="amount-total">${book.items.price * book.quantity}</p></div>


                                </li>))}

                            <li className="line-sep"></li>

                            <button className="button3"
                                    onClick={() => clearCart()}>Clear Cart
                            </button>

                            {/*<div className="cart-book-subtotal">*/}
                            {/*    <p>SubTotal {cart.reduce((accumulator, item: any) => {*/}
                            {/*        return accumulator += item.quantity * item.items.price;*/}
                            {/*    }, 0)}</p>*/}

                            {/*</div>*/}


                        </ul>
                    </div>
                </div>
                <div className="side-box">
                    <div className="cart-info">

                        <h3 className="header-cart">Summary</h3>
                        <hr/>
                        <table>
                            <tr>

                                <td>Total (items):</td>
                                <td>{cart.reduce((accumulator, item: any) => {
                                    return accumulator += item.quantity;
                                }, 0)} </td>
                            </tr>

                            <tr>
                                <td>Subtotal:</td>
                                <td>${cart.reduce((accumulator, item: any) => {
                                    return accumulator += item.quantity * item.items.price;
                                }, 0).toFixed(2)}</td>
                            </tr>

                            <tr>

                                <td>Estimated Tax:</td>
                                <td>${cart.reduce((accumulator, item: any) => {
                                    return accumulator += item.quantity * item.items.price / (190);
                                }, 0).toFixed(2)}</td>
                            </tr>

                            <tr>


                                <td>Total Price:</td>
                                <td>${cart.reduce((accumulator, item: any) => {
                                    return accumulator += (item.quantity * item.items.price / (190)) + (item.quantity * item.items.price);
                                }, 0).toFixed(2)} </td>
                            </tr>
                        </table>
                        <hr/>
                        <br/>

                        <button className="button1"><Link to="/checkout"><p className="check">Check Out</p></Link>

                        </button>
                        <br/>


                        <button className="button2"><Link to={`/categories/${localStorage.getItem(activeCategoryKey)}`}>
                            <p className="conta">Continue Shopping</p></Link>
                        </button>


                    </div>
                </div>

            </div>
        </div>

            ) : (
            <div>
                <div className="empty-cart-message">No items in the cart.</div>
                <div><Link to={`/categories/${localStorage.getItem(activeCategoryKey)}`}><p
                    className="continue">Continue Shopping</p></Link></div>
            </div>


            );
            }

            export default CartTable;

