import '../assets/css/HomeCategoryList.css';
import '../assets/css/Home.css';


function HomeCategoryList() {
    return (
        <section className="category-images container">
            <div className="category-image-items">
                <a href="category.html">
                    <div className="book1">
                        <img src={require('../assets/images/categories/book2.gif')}
                             alt="book" className="image"/>
                        <div className="overlay">
                            <div className="text">Read Now</div>
                        </div>
                    </div>
                </a>
                <a href="category.html">
                    <div className="book2">
                        <img src={require('../assets/images/categories/book1.gif')}
                             alt="book" className="image"/>
                        <div className="overlay">
                            <div className="text">Read Now</div>
                        </div>
                    </div>
                </a>
                <a href="category.html">
                    <div className="book1">
                        <img src={require('../assets/images/categories/elon.gif')}
                             alt="book" className="image"/>
                        <div className="overlay">
                            <div className="text">Read Now</div>
                        </div>
                    </div>
                </a>
            </div>
        </section>
    );
}

export default HomeCategoryList;
