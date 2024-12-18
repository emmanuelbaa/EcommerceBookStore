import '../assets/css/ConfirmationTable.css';
import { asDollarsAndCents } from "./utils";
import { BookItem, OrderDetails } from '../types';

function ConfirmationTable({ orderDetails }: { orderDetails: OrderDetails }) {
    const TAX_RATE = 0.08; // Example: 8% tax rate

    // Calculate total price
    const totalPrice = orderDetails.books.reduce((total, book, index) =>
        total + (book.price * orderDetails.line_items[index].quantity), 0);

    // Calculate estimated tax
    const estimatedTax = totalPrice * TAX_RATE;

    return (
        <table className="confirmation_table">
            <thead>
            <tr>
                <th className="confirmation_th">Title</th>
                <th className="confirmation_th">Quantity</th>
                <th className="confirmation_th">Price</th>
            </tr>
            </thead>
            <tbody>
            {orderDetails.books.length > 0 ? (
                orderDetails.books.map((book: BookItem, index: number) => (
                    <tr className="confirmation_tr" key={book.bookId}>
                        <td className="confirmation_td">{book.title}</td>
                        <td className="confirmation_td">{orderDetails.line_items[index].quantity}</td>
                        <td className="confirmation_td">
                            {asDollarsAndCents(book.price * orderDetails.line_items[index].quantity * 100)}
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={3} className="confirmation_td">
                        No order details found.
                    </td>
                </tr>
            )}
            {orderDetails.books.length > 0 && (
                <>
                    {/*<tr>*/}
                    {/*    <td><b>Total:</b></td>*/}
                    {/*    <td></td>*/}
                    {/*    <td className="confirmation_td">*/}
                    {/*        {asDollarsAndCents(totalPrice * 100)}*/}
                    {/*    </td>*/}
                    {/*</tr>*/}
                    <tr>
                        <td><b>Estimated Tax:</b></td>
                        <td></td>
                        <td className="confirmation_td">
                            {asDollarsAndCents(estimatedTax * 100)}
                        </td>
                    </tr>
                    <tr>
                        <td><b>Total:</b></td>
                        <td></td>
                        <td className="confirmation_td">
                            {asDollarsAndCents((totalPrice + estimatedTax) * 100)}
                        </td>
                    </tr>
                </>
            )}
            </tbody>
        </table>
    );
}

export default ConfirmationTable;
