import { Link } from "react-router-dom";
import "./Header.css";

export function Header() {
    return (
        <header className="app-header">
            <div className="header-inner">
                <Link to="/" className="logo">
                    🎬 MovieApp
                </Link>

                <nav className="nav-links">
                    <Link to="/favorites" className="primary-link">
                        Favorites
                    </Link>
                    <Link to="/watchlist" className="primary-link">
                        Watchlist
                    </Link>
                </nav>
            </div>
        </header>
    );
}