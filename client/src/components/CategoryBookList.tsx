import { useState, useEffect } from 'react';
import '../types';
import '../assets/css/CategoryBookList.css';
import '../assets/css/Home.css';
import CategoryBookListItem from './CategoryBookListItem';
import CategoryNav from './CategoryNav';
import { BookItem } from "../types";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {activeCategoryKey} from "../contexts/CartContext";

function CategoryBookList() {
    const { catName } = useParams();
    // @ts-ignore
    localStorage.setItem(activeCategoryKey, catName);
    const [book, setBooks] = useState<BookItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchBooksByCategory = async (categoryName: string) => {
            try {

                const response = await axios.get(`http://webdev.cs.vt.edu:8080/EmmanuelBookstoreReactTransact/api/categories/name/${categoryName}/books`);
                const data = await response.data;
                setBooks(data);
            } catch (error) {
                console.error('Error fetching books:', error);
            } finally {
                setLoading(false);
            }
        };

        if (catName) {
            fetchBooksByCategory(catName);
        }
    }, [catName]);

    return (
        <>
            {/*<div style={{*/}
            {/*    minHeight: '86.1vh',*/}
            {/*    minWidth: '1200px'*/}
            {/*}}>*/}
            <CategoryNav catName={catName || ""}/>
            <section className="cattier">
                <ul className="book-lists">


                    {/* Display a loading message while fetching */}
                    {loading ? (
                        <p>Loading books...</p>
                    ) : (

                        book.map((book: BookItem) => (
                            <CategoryBookListItem
                                key={book.bookId}
                                book={book}


                            />

                        ))
                    )}

                    <div className="readNow">

                        <button className="reader"><i className="fa-solid fa-book"></i></button>

                    </div>

                </ul>
            </section>
            {/*</div>*/}

        </>
    );
}

export default CategoryBookList;
