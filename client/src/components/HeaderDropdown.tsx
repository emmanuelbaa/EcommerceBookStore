import '../assets/css/global.css'
import '../assets/css/HeaderDropdown.css';
// import {categoryList} from '../types';

import { Link } from 'react-router-dom';
// import {CategoryItem, CatProp} from "../types";


function HeaderDropdown() {
  return (

      <section id="Second-Header">
          <ul>
              <div className="home">
                  <li><a href="/">Home</a></li>

              </div>

              <li className="dropdown">
                  <div className="Category">
                      <a href="/categories" className="dropbtn">Category</a>
                      {/*<div className="dropdown-content">*/}
                      {/*    <a href="/categories">Fantasy</a>*/}
                      {/*    <a href="/categories">Fiction</a>*/}
                      {/*    <a href="category.html">Art</a>*/}
                      {/*    <Link  to="/categories">Computing</Link>*/}
                      {/*    <a href="category.html">Architecture</a>*/}
                      {/*</div>*/}
                            <div className="dropdown-content">

                          {/*{prop.catList.map((item: CategoryItem) => <li>*/}
                          {/*    <Link to = {`/categories/${item.name}`}>*/}
                          {/*        {item.name}</Link>*/}
                          {/*</li>)}*/}
                     </div>
                  </div>
              </li>
              <div className="new">
                  <li><a href="#news">New Releases</a></li>
              </div>

              <div className="best">
                  <li><a href="#news">Best Sellers</a></li>
              </div>
              <div className="For">
                  <li><a href="#news">For Kids</a></li>
              </div>

          </ul>
      </section>

  )
}

export default HeaderDropdown

