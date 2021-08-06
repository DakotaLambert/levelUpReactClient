import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"
import logo from "../../images/levelupLogo.png"
export const NavBar = (props) => {
    return (
        <ul className="navbar">
            <Link to="/"><img src={logo} style={{maxHeight: "5rem"}} className="navbarLogo"/></Link>
            <li className="navbar__item">
                <Link to="/games">Games</Link>
            </li>
            <li className="navbar__item">
            <Link to="/events">Events</Link>
            </li>
            <li className="navbar__item">
            <Link to="/badBoiLink">BLANK</Link>
            </li>
            {
                (localStorage.getItem("lu_token") !== null) ?
                    <li className="navbar__item">
                        <Link className="fakeLink"
                            onClick={() => {
                                localStorage.removeItem("lu_token")
                                props.history.push({ pathname: "/" })
                            }}
                        >Logout</Link>
                    </li> :
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>
            }        </ul>
    )
}
