import React from 'react';
import "./Header.css";
import { NavLink } from "react-router-dom";

export const Header = () => {
  return(
      <header className="header">
        <h1 className="header__heading">Конвертер валют</h1>
          <div className="header__wrapper">
              <nav className="menu">
                  <NavLink
                      exact to="/"
                      className="menu__nav-item"
                      activeClassName="menu__nav-item_active">
                      Конвертер
                  </NavLink>
                  <NavLink
                      exact to="/rates"
                      className="menu__nav-item"
                      activeClassName="menu__nav-item_active">
                      Курсы валют
                  </NavLink>
              </nav>
          </div>
      </header>

  )
}