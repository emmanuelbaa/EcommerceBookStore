//import HomeCategoryList from './HomeCategoryList';
import '../assets/css/global.css';
import '../assets/css/Home.css';
import '../assets/css/HomeCategoryList.css';
import { Link } from "react-router-dom";
import {CategoryItem} from "../types";

// @ts-ignore
import {Category, CategoryContext} from "../contexts/CategoryContext";
import {useContext} from "react";



// @ts-ignore
function Home() {
    const categories = useContext(Category);

    return (
        <>
        {/*// <div style={{minHeight:'86.1vh',*/}
        {/*//                     minWidth:'1200px'}}>*/}
            <section className="nav-heading">
                <section className="Second-Header">
                    <ol>
                        <li className="home">
                            <Link to="/">Home</Link>
                        </li>

                        <li className="dropdown">
                            <div className="Category">
                                <Link to="/categories/Art" className="dropbtn">Category</Link>
                                <div className="dropdown-content">
                                    {categories.map((item: CategoryItem, index: number) => (
                                        <div key={index}>
                                            <Link to={`/categories/${item.name}`}>{item.name}</Link>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </li>


                        <li className="new">
                            <Link to="#news">New Releases</Link>
                        </li>


                        <li className="best">
                            <Link to="#bestsellers">Best Sellers</Link>
                        </li>

                        <li className="for-kids">
                            <Link to="/categories">For Kids</Link>
                        </li>
                    </ol>
                </section>
            </section>


            <section className="cont">
                {/*// <div style={{minHeight:'86.1vh',*/}
                {/*                    minWidth:'1200px'}}>*/}
                <section className="home-page-container">

                    {/*<div className="category-image-items">*/}
                    <section className="front-book-container">
                        <section className="display-front-books">
                            <section className="first-book">
                                <div className="book">
                                    <Link to="/categories">
                                        <img src={require('../assets/images/categories/book1.gif')} width = "300px" alt="book"
                                             className="image"/>
                                        <div className="overlay">
                                            <div className="text"><Link to="/categories/Fiction">Read Now</Link></div>
                                        </div>
                                    </Link>
                                </div>
                            </section>


                            <div className="book">
                                <Link to="/categories">
                                    <img src={require('../assets/images/categories/book2.gif')} alt="book"
                                         className="image"/>
                                    <div className="overlay">
                                        <div className="text"><Link to="/categories/Fantasy">Read Now</Link></div>
                                    </div>
                                </Link>
                            </div>


                            <div className="book">
                                <Link to="/categories">
                                    <img src={require('../assets/images/categories/elon.gif')} alt="book"
                                         className="image"/>
                                    <div className="overlay">
                                        <div className="text"><Link to="/categories/Computing">Read Now</Link></div>
                                    </div>
                                </Link>
                            </div>
                        </section>
                    </section>


                    <div className="welcome-message">
                        <section className="welcome-text flow-content container dark-background">
                            <h2>Featured New Releases</h2>
                            <p>
                                Get the newest books released by your favorite
                            </p>
                            <h3>Authors</h3>
                        </section>

                        <button className="CTA">
                            <span><Link to="/categories/Fantasy">BUY NOW!</Link></span> {/* Use Link instead of <a> */}
                        </button>
                    </div>
                    {/*</div>*/}
                </section>
            {/*</div>*/}
            </section>
        {/*// </div>*/}


        </>
    )
        ;
    // <HeaderDropdown catList={prop.catList}/>
}

export default Home;
