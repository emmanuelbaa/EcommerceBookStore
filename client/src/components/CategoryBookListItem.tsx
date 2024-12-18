import '../assets/css/CategoryBookListItem.css';
// import '../assets/images/books/elon-musk.png';
// import '../assets/images/books/python-crash-course.gif';
// import '../assets/images/books/the-chatgpt-millionaire.gif';
// import '../assets/images/books/the-non-designers.gif';
import { BookItem } from "../types";
import {useParams} from "react-router-dom";
import {CartTypes} from "../reducers/CartReducer";
import {useContext} from "react";
import {CartStore} from "../contexts/CartContext";

function CategoryBookListItem(props: { book: BookItem }) {
    const { book } = props;  // Destructure the book object from props

    const  {dispatch} = useContext(CartStore);
    const addBookToCart = () => {
        dispatch({  type: CartTypes.ADD, item:book, id : book.bookId});
    };
    const bookImageFileName = (book: BookItem) => {
        let name = book.title.toLowerCase().replace(/ /g, "-").replace(/'/g, "");
      console.log(name);
        name = `${name}.png`;
    console.log(book.title + "->" + name);
        return name;




    };


    return (
        <li className="book-box">
            <div className="book-box-item">
            <div className="book-image-first">
                <div className="book-image">

                    <img src={require(`../assets/images/books/${bookImageFileName(book)}`)} />
                </div>


            </div>
            <div className="book-des">
                <div className="book-title">{book.title}</div>
                <div className="book-author">{book.author}</div>
                <div className="book-price">${book.price.toFixed(2)}</div>

            </div>
            </div>
            <div className="we-add-book">
            <button className="button" onClick={addBookToCart}>Add to Cart</button>
            </div>
        </li>
    );
}

export default CategoryBookListItem;
