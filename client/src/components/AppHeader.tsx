import HeaderDropdown from './HeaderDropdown';
import '../assets/css/global.css';
import '../assets/css/AppHeader.css';
import { Link } from 'react-router-dom';
import HomeCategoryList from "./HomeCategoryList";
// import {CatProp} from "../types";
import Home from "./Home";
import {useContext} from "react";
import {CartStore} from "../contexts/CartContext";

function AppHeader() {

    const  {cart} = useContext(CartStore);
    console.log(cart);
    return (
        <>
            <header className="container">

                <section className="links1">
                    <Link to="/">
                        <div className="logo">
                            <img
                                src={require('../assets/images/site/logomania1.png')}
                                alt="bookworm Logo"/>
                        </div>
                    </Link>

                    <div className="text-logo">
                        <Link to="/"><h1>Book Worms </h1></Link>
                    </div>
                </section>

                <section className="social-media-icons1">
                    <div className="search-container">
                        <input type="text" placeholder="Search..."/>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                </section>


                <section id="copyright">

                        <div className=" notification">
                            <Link to="/login">
                                <i className="fa-solid fa-arrow-right-to-bracket"></i>
                            </Link>
                        </div>


                        <div className="notification">
                            <i className="fa-regular fa-bell"></i>
                            {/*<span className="badge"></span>*/}
                        </div>


                        <div className=" notification2">
                            <Link to="/cart">
                                <i className="fa-solid fa-cart-shopping">
                                    <div className="badge">
                                        <p>{cart.reduce((accumulator, item) => {
                                            return accumulator += item.quantity;
                                        }, 0)}</p>
                                    </div>
                                </i>
                            </Link>
                        </div>
                </section>


                    {/*<div className="flex-container">*/}

                    {/*<Link to="/">*/}
                    {/*    <div className="logo">*/}
                    {/*        <img*/}
                    {/*            src={require('../assets/images/site/logomania.png')}*/}
                    {/*            alt="bookworm Logo"*/}

                    {/*        />*/}
                    {/*    </div>*/}
                    {/*</Link>*/}


                    {/*<div className="logo-image">*/}


                    {/*    <div className="text-logo">*/}
                    {/*        <Link to="/"><h1>Book Worms </h1></Link>*/}
                    {/*    </div>*/}


                    {/*    <div>*/}
                    {/*        <div className="search-container">*/}
                    {/*            <input type="text" placeholder="Search..."/>*/}
                    {/*            <i className="fa-solid fa-magnifying-glass"></i>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}

                    {/*    <div className="login">*/}
                    {/*        <Link to="/login">*/}
                    {/*            <i className="fa-solid fa-arrow-right-to-bracket"></i>*/}
                    {/*        </Link>*/}
                    {/*    </div>*/}


                    {/*    <div className="notification">*/}
                    {/*        <i className="fa-regular fa-bell"></i>*/}
                    {/*        <span className="badge"></span>*/}
                    {/*    </div>*/}


                    {/*    <div className="cart">*/}
                    {/*        <Link to="/cart">*/}
                    {/*            <i className="fa-solid fa-cart-shopping">*/}
                    {/*                <div className="badge">*/}
                    {/*                    <p>{cart.reduce((accumulator, item) => {*/}
                    {/*                        return accumulator += item.quantity;*/}
                    {/*                    }, 0)}</p>*/}
                    {/*                </div>*/}
                    {/*            </i>*/}
                    {/*        </Link>*/}
                    {/*    </div>*/}

                    {/*</div>*/}


                    {/*</div>*/}


            </header>

        </>
);
//
//     <HeaderDropdown catList={prop.catList}/>

}

export default AppHeader;
