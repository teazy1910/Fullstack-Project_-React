// import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <>
      <nav className="navbar">
        <Link className="navbar-brand" to="/">
          Home
        </Link>
        <div className="navbar-nav">
          <Link className="nav-item nav-link" to="/settings">
            Settings
          </Link>
          <Link className="nav-item nav-link" to="/products">
            Products
          </Link>
        </div>
      </nav>
    </>
  );
}
