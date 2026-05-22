import '../styles/navbar.css'
import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="navbar">
            <ul className="navbar_links">
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) => isActive ? "active" : ""}
                    >
                        Home
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/user/create"
                        className={({ isActive }) => isActive ? "active" : ""}
                    >
                        Register account
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}