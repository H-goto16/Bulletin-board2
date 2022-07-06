import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import { logout } from "../function/function";

export default class Navbar extends React.Component {

    render() {
        return (
            <div className="header">
                <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to={"/"}>Bulletin Board</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                            <div className="menu-icon">
                                <span className="menu first"></span>
                                <span className="menu second"></span>
                                <span className="menu third"></span>
                            </div>
                        </button>
                        <div className="collapse navbar-collapse d-lg-inline-flex justify-content-lg-end" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/Mypage"}>マイページ</Link>
                                </li>
                                <li className="nav-item">
                                    <input className="navlink button" type="button" value="ログアウト" onClick={logout} />
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/Register"}>新規登録</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/login"}>ログイン</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}
