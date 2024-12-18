import "../assets/css/checkout.css";
//import { isCreditCard, isMobilePhone, isValidEmail } from "../utils";
import { BookItem, CustomerForm, months, OrderDetails, years } from "../types";

import {activeCategoryKey, CartStore} from "../contexts/CartContext";
import {ChangeEvent, FormEvent, useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { CartTypes } from "../reducers/CartReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons/faMinusCircle";
import {isCreditCard, isMobilePhone, isvalidEmail} from "./utils";
import axios from "axios";
import {apiClient} from "../assets/axios";

function CheckoutPage() {
    const { cart, dispatch } = useContext(CartStore);
    const navigate = useNavigate();

    const [nameError, setNameError] = useState("");
    const [addressError, setAddressError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [ccError, setCcError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phone: "",
        email: "",
        ccNumber: "",
        ccExpiryMonth: 0,
        ccExpiryYear: 0,
    });

    const [checkoutStatus, setCheckoutStatus] = useState("");

    const cartTotalPrice =  cart.reduce((accumulator, item: any) => {
        return accumulator +=(item.quantity * item.items.price /(190))+(item.quantity * item.items.price);
    }, 0).toFixed(2);

    const estimatedTax = cart.reduce((accumulator, item: any) => {
        return accumulator +=(item.quantity * item.items.price)*0.08 }, 0).toFixed(2);

    const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    const subTotal= cart.reduce((accumulator, item: any) => {
        return accumulator += item.quantity * item.items.price;
    }, 0).toFixed(2);

    const bookImageFileName = (bookTitle: string) => {
        let name = bookTitle.toLowerCase().replace(/ /g, "-").replace(/'/g, "");
        name = `${name}.png`;
        try {
            return require(`../assets/images/books/${name}`);
        } catch (_) {
            return require("../assets/images/books/bewitched.png");
        }
    };
    function yearFrom(index: number) {
        return new Date().getFullYear() + index;
    }

    const addBookToCart = (book: BookItem) => {
        dispatch({ type: CartTypes.ADD, item: book, id: book.bookId });
    };

    const removeBookFromCart = (book: BookItem) => {
        dispatch({ type: CartTypes.REMOVE, item: book, id: book.bookId });
    };

    const clearCart = () => {
        dispatch({ type: CartTypes.CLEAR });
    };

    const isValidForm = () => {
        const isValidName = formData.name.length >= 4 && formData.name.length <= 45;
        const isValidAddress = formData.address.length >= 4 && formData.address.length <= 45;
        const isValidPhone = isMobilePhone(formData.phone);
        const isValidEmail = isvalidEmail(formData.email);
        const isValidCc = isCreditCard(formData.ccNumber);




        setNameError(isValidName ? "" : "Name must be between 4 and 45 characters!");
        setAddressError(isValidAddress ? "" : "Address cannot be empty!");
        setPhoneError(isValidPhone ? "" : "Phone must be a 10-digit number!");
        setEmailError(isValidEmail ? "" : "Invalid email address!");
        setCcError(isValidCc ? "" : "Credit card must be 16 digits!");

        //
        // if (nameError !== "") {
        //     console.log(nameError);
        //
        //     return false;
        //
        // }
        //
        // if (addressError !== "") {
        //     return false
        // }
        // if (phoneError !==""){
        //     return false;
        // }
        // if (ccError !== ""){
        //     return false;
        // }




        return isValidName && isValidAddress && isValidPhone && isValidEmail && isValidCc;
    };

    async function submitOrder(event:FormEvent) {
        event.preventDefault();
        console.log("Submit order");
        const isFormCorrect =  isValidForm();
        console.log(isFormCorrect);
        if (!isFormCorrect) {
            setCheckoutStatus("ERROR");
        } else {
            setCheckoutStatus("PENDING");
            const orders = await placeOrder({
                name: formData.name,
                address: formData.address,
                phone: formData.phone,
                email: formData.email,
                ccNumber: formData.ccNumber,
                ccExpiryMonth: formData.ccExpiryMonth,
                ccExpiryYear: formData.ccExpiryYear,
            })
            if(orders) {
                setCheckoutStatus("OK");
                 clearCart();
                navigate('/confirmation', {state: orders })}
            else{
                console.log("Error placing order");
            }
        }
    }

    const placeOrder =  async (customerForm: CustomerForm) =>  {

        const order = { customerForm: customerForm, cart:{itemArray:cart} };

        const orders = JSON.stringify(order);
        // console.log(orders);     //you can uncomment this to see the orders JSON on the console
        const url = 'http://webdev.cs.vt.edu:8080/EmmanuelBookstoreReactTransact/api/orders';

        const orderDetails: OrderDetails = await axios.post(url, orders,
            {headers: {
                    "Content-Type": "application/json",
                }
            })
            .then((response: { data: any; }) => {
                dispatch({type: CartTypes.CLEAR});
                return response.data;
            })
            .catch((error: any)=>console.log(error));
        console.log("order details: ", orderDetails);
        return orderDetails;
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

        switch (name) {
            case "name":
                setNameError(value.length >= 4 && value.length <= 45 ? "" : "Name must be between 4 and 45 characters!");
                break;
            case "address":
                setAddressError(value.length > 0 ? "" : "Address cannot be empty!");
                break;
            case "phone":
                setPhoneError(/^\d{10}$/.test(value) ? "" : "Phone must be a 10-digit number!");
                break;
            case "email":
                setEmailError(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Invalid email address!");
                break;
            case "ccNumber":
                setCcError(/^\d{16}$/.test(value) ? "" : "Credit card must be 16 digits!");
                break;
            default:
                break;
        }
    };

    return cart.length > 0 ? (

        <div style={{
            minHeight: '86.1vh',
            minWidth: '1200px'
        }}>
            <section className="checkout-cart-table-view">


                <div className="checkout-page-body">
                    <div className="formnie">
                        <form className="checkout-form" onSubmit={submitOrder} method="post">
                            <div className="formnie">


                                <label htmlFor="fname">Name</label>
                                <input
                                    type="text"
                                    size={20}
                                    name="name"
                                    id="fname"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                                {nameError && <div className="error">{nameError}</div>}
                            </div>
                            <div>
                                <label htmlFor="address">Address</label>
                                <input
                                    type="text"
                                    size={50}
                                    name="address"
                                    id="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                />
                                {addressError && <div className="error">{addressError}</div>}
                            </div>
                            <div>
                                <label htmlFor="phone">Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />
                                {phoneError && <div className="error">{phoneError}</div>}
                            </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                                {emailError && <div className="error">{emailError}</div>}
                            </div>
                            <div>
                                <label htmlFor="ccNumber">Credit Card</label>
                                <input
                                    type="text"
                                    name="ccNumber"
                                    id="ccNumber"
                                    value={formData.ccNumber}
                                    onChange={handleInputChange}
                                />
                                {ccError && <div className="error">{ccError}</div>}
                            </div>
                            <label htmlFor="ccExpiryMonth">Exp Date</label>
                            <div className="expiry">


                                <div className="datum">
                                    <select
                                        name="ccExpiryMonth"
                                        value={formData.ccExpiryMonth}
                                        onChange={handleInputChange}
                                    >
                                        {months.map((month, i) => (
                                            <option key={i} value={i + 1}>
                                                {month}
                                            </option>
                                        ))}
                                    </select>
                                    <select
                                        name="ccExpiryYear"
                                        value={formData.ccExpiryYear}
                                        onChange={handleInputChange}
                                    >
                                        {years.map((year, i) => (
                                            <option key={i} value={yearFrom(i)}>
                                                {yearFrom(i)}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                            </div>
                        </form>
                    </div>

                    <div className="summary">
                        <div>
                            <table>
                                <tr>
                                    <td>Total Items:</td>
                                    <td>{cartQuantity}</td>
                                </tr>
                                <tr>
                                    <td>Subtotal:</td>
                                    <td>${subTotal}</td>
                                </tr>

                                <tr>
                                    <td>Estimated Tax:</td>
                                    <td>${estimatedTax}</td>
                                </tr>

                                <tr>
                                    <td>Total Price:</td>
                                    <td>${cartTotalPrice}</td>
                                </tr>

                            </table>



                            <button className="order" type="submit" onClick={submitOrder}><p className="check">Complete
                                Purchase</p>
                            </button>
                            <div>
                                {/*The following code displays different string based on the */}
                                {/*value of the checkoutStatus*/}
                                {/*Note the ternary operator*/}
                                {
                                    checkoutStatus !== '' ?
                                        <>
                                            <section className="checkoutStatusBox">
                                                {(checkoutStatus === 'ERROR') ?
                                                    <div>
                                                        Error: Please fix the problems above and try again.
                                                    </div> : (checkoutStatus === 'PENDING' ?
                                                        <div>
                                                            Processing...
                                                        </div> : (checkoutStatus === 'OK' ?
                                                            <div>
                                                                Order placed...
                                                            </div> :
                                                            <div>
                                                                An unexpected error occurred, please try again.
                                                            </div>))}
                                            </section>
                                        </>
                                        : <></>}
                            </div>


                        </div>
                    </div>
                </div>


                <div>
                    <div className="books-checked">
                        <ul className="checkout-cart-info">
                            {cart.map((book: any) => (
                                <div className="checkout-cart-book-item" key={book.items.title}>
                                    <div className="checkout-cart-book-image">
                                        <img
                                            src={bookImageFileName(book.items.title)}
                                            alt={book.items.title}
                                            className="checkout-cart-info-img"
                                            width="20%"
                                            height="20%"
                                        />
                                    </div>
                                    <div className="checkout-cart-book-info">
                                        <div className="checkout-cart-book-title">{book.items.title}</div>
                                        <div className="checkout-cart-book-subtotal">
                                            ${(book.items.price * book.quantity).toFixed(2)}
                                        </div>
                                        <div className="checkout-cart-book-quantity">
                                            <button
                                                className="icon-button dec-arrow-button"
                                                onClick={() => addBookToCart(book.items)}
                                            >
                                                <FontAwesomeIcon icon={faPlusCircle}/>
                                            </button>
                                            <span className="quantity">{book.quantity}</span>
                                            <button
                                                className="icon-button inc-arrow-button"
                                                onClick={() => removeBookFromCart(book.items)}
                                            >
                                                <FontAwesomeIcon icon={faMinusCircle}/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>

            </section>
        </div>
            ): (
            <div>
                <div className="empty-cart-message">No items in the cart.</div>
                <div><Link to={`/categories/${localStorage.getItem(activeCategoryKey)}`}><p
                    className="continue">Continue Shopping</p></Link></div>
            </div>


            );

            }

            export default CheckoutPage;
