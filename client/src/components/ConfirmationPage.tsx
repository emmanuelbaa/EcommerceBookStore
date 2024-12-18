import '../assets/css/ConfirmationPage.css';
import '../assets/css/confirmation.css';
import ConfirmationTable from "./ConfirmationTable";
import { useContext } from "react";

import { OrderDetailsStore } from "../contexts/OrderDetailsContext";
import {useLocation} from "react-router-dom";

function ConfirmationPage() {
    const context = useContext(OrderDetailsStore);
    if (!context) {
        return <div>Error: Context not available. Please try again.</div>;
    }

    const maskCreditCard = (ccNumber: string) => {
        return `**** **** **** ${ccNumber.slice(-4)}`;
    };


    // @ts-ignore
    // const { orderDetails } = context;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {state}= useLocation()

    const orderDetails = state

    if (!orderDetails) {
        return <div>Error: Order details not available. Please try again.</div>;
    }


    const orderDate = () => {
        const date = orderDetails?.order?.dateCreated ? new Date(orderDetails.order.dateCreated) : new Date();
        return date.toLocaleString();
    };

    const ccExpDate = (): string => {
        const expDate = new Date(orderDetails.customer.ccExpDate);
        const month = expDate.getMonth() + 1; // getMonth() is zero-based
        const year = expDate.getFullYear();
        return `${month.toString().padStart(2, '0')}/${year}`;
    };

    return (
        <div className="confirmationView">
            <ul>
                <li>Confirmation #: {orderDetails.order.confirmationNumber}</li><li>   </li>
                <li>{orderDate()}</li>
            </ul>
            <ConfirmationTable orderDetails = {orderDetails}  />
            <ul>
                <li><b>Name:</b> {orderDetails.customer.customerName}</li>
                <li><b>Address:</b> {orderDetails.customer.address}</li>
                <li><b>Email:</b> {orderDetails.customer.email}</li>
                <li><b>Phone:</b> {orderDetails.customer.phone}</li>
                <li>
                    <b>Credit Card:</b> {maskCreditCard(orderDetails.customer.ccNumber)} (
                    {ccExpDate()})
                </li>
            </ul>
            <div id="customerInfo"></div>
        </div>
    );
}

export default ConfirmationPage;
