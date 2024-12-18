import '../assets/css/AppFooter.css';
import '../assets/css/global.css';
import { Link } from "react-router-dom";

function AppFooter() {
    return (
        <footer className="container">
            <div className="flex-conco">
                {/* Links Section */}
                <div>
                    <section className="links">
                       <div className="about"> <Link to="/about-us">AboutUs</Link></div>
                       <div className="contact"><Link to="/contact-us">ContactUs</Link></div>
                        <div className = "direct"><Link to="/directions">Directions</Link></div>
                    </section>
                </div>

                {/* Social Media Section */}
                <div>
                    <section className="social-media-icons">

                           <div className="twi"><Link to="#" aria-label="Twitter">
                               <i className="fa-brands fa-x-twitter icon"></i>
                           </Link></div>


                           <div className = "fac"><Link to="#" aria-label="Facebook">
                               <i className="fa-brands fa-facebook icon"></i>
                           </Link></div>


                            <div className = "inst"><Link to="#" aria-label="Instagram">
                                <i className="fa-brands fa-instagram icon"></i>
                            </Link></div>

                    </section>
                </div>

                {/* Copyright Section */}
                <div>
                    <section id="copyright1">
                        <div className="copyright">
                            <span>© 2024 Book Worms. All rights reserved.</span>
                        </div>
                    </section>
                </div>
            </div>
        </footer>
    );
}

export default AppFooter;
