import React from 'react';
import "./Header.css";
import { NavLink } from "react-router-dom";

export const Header = () => {
  return(
      <header>
        <h1>Конвертер валют</h1>
        <nav>
          <NavLink
              exact to="/"
              className="menu__nav-item"
              activeClassName="menu__nav_active">
            Конвертер
          </NavLink>
          <NavLink
              exact to="/rates"
              className="menu__nav-item"
              activeClassName="menu__nav_active">
            Курсы валют
          </NavLink>
        </nav>
      </header>

  )
}