import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import Home from './components/Home';
import CategoryBookList from './components/CategoryBookList';
import CategoryBookListItem from './components/CategoryBookListItem';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
//import HomeCategoryList from "./components/HomeCategoryList";
import {useEffect, useState} from "react";
import axios from "axios";
import categoryBookList from "./components/CategoryBookList";
import Cart from "./components/Cart";
import Checkout from "./components/CheckoutPage";
import CheckoutPage from "./components/CheckoutPage";
import ConfirmationPage from "./components/ConfirmationPage";

function App() {


    return (
        <Router basename={"EmmanuelBookstoreReactTransact"} >
            <AppHeader/>
            <Routes>
                {/* Route for the homepage, so that it renders the Home component when the path is "/" */}
                <Route path="/" element={<Home />} />
                {/* eslint-disable-next-line react/jsx-no-undef */}
                <Route path = "/cart" element = {<Cart />} />
                {/* eslint-disable-next-line react/jsx-no-undef */}
                <Route path = "/checkout" element = {<CheckoutPage />}/>
                <Route path ="/confirmation" element = {<ConfirmationPage />}/>
                {/* Route for the category book list */}
                <Route path="/categories" element={<CategoryBookList/>} >
                    <Route path=":catName" element={<CategoryBookList />} />

                    </Route>

                {/* Catch-all route for undefined paths */}
                <Route path="*" element={<div>Page Not Found</div>} />
            </Routes>
            <AppFooter />
        </Router>

    );
}

export default App;
