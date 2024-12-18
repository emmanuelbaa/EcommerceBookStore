import '../assets/css/CategoryNav.css';
import '../assets/css/global.css';
import { Link } from 'react-router-dom';

// @ts-ignore
function CategoryNav({catName}: {catName: string}) {
    return (
        <div className="category-page">
            <section className="navist">
                <nav className="category-nav">
                    <ul className="category-buttons">
                        <li>
                            <Link style={{backgroundColor: (catName === "Fantasy") ? "green" : "#333"}}
                                  className="button unselected-category-button" to="/categories/Fantasy">
                                Fantasy
                            </Link>
                        </li>
                        <li>
                            <Link style={{backgroundColor: (catName === "Fiction") ? "green" : "#333"}}
                                  className="button unselected-category-button" to="/categories/Fiction">
                                Fiction
                            </Link>
                        </li>
                        <li>
                            <Link style={{backgroundColor: (catName === "Art") ? "green" : "#333"}}
                                  className="button unselected-category-button" to="/categories/Art">
                                Art
                            </Link>
                        </li>
                        <li>
                            <Link style={{backgroundColor: (catName === "Computing") ? "green" : "#333"}}
                                  className="button unselected-category-button" to="/categories/Computing">
                                Computing
                            </Link>
                        </li>
                        <li>
                            <Link style={{backgroundColor: (catName === "Architecture") ? "green" : "#333"}}
                                  className="button unselected-category-button" to="/categories/Architecture">
                                Architecture
                            </Link>
                        </li>
                    </ul>
                </nav>
            </section>

        </div>
    );
}

export default CategoryNav;
