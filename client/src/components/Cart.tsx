import { Link } from "react-router-dom";
import CartTable from "./CartTable";
import {BookItem} from "../types";
import "../assets/css/Carttable.css";
import "../assets/css/cart.css";

function Cart() {

    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
         // <div className="Cart">
        <div className="cart-books-table">
            <h1 className="page-name">Cart</h1>
            <CartTable></CartTable>


        </div>



);
}

export default Cart;