// import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <>
      <nav className="navbar">
        <Link className="navbar-brand" to="/">
          Melitta
        </Link>

        <div className="navbar-nav">
          <Link className="nav-item nav-link active" to="/">
            Menu
          </Link>
          <Link className="nav-item nav-link" to="/about">
            Products
          </Link>
          <Link className="nav-item nav-link" to="/contact">
            Settings
          </Link>
        </div>
      </nav>
    </>
  );
}
