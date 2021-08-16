import React from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../theme-context";
import stylesHeader from "./header.module.css";

//Consumer - render props который возвращает нам реакт-элемент. Вернем заголовок
//Consumer первым аргументом принимает то value, которое мы передали в ThemeContext.Provider. value - это текущая тема и ее имя
//передади объект темы theme вместо value
export function Header() {
  return (
    <>
      <ThemeContext.Consumer>
        {({ theme, changeTheme }) => {
          return (
            <div
              className={stylesHeader.header}
              style={{ backgroundColor: theme.theme.color }}
            >
              <div className={stylesHeader.btn}>
                <button
                  className="btn btn-secondary dropdown-toggle"
                  href="#"
                  role="button"
                  id="dropdownMenuLink"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  Цвет темы
                </button>

                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuLink"
                >
                  <li>
                    <a
                      onClick={() => changeTheme("мятная")}
                      className="dropdown-item"
                      href="#"
                    >
                      Мятный
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => changeTheme("синяя")}
                      className="dropdown-item"
                      href="#"
                    >
                      Синий
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => changeTheme("черная")}
                      className="dropdown-item"
                      href="#"
                    >
                      Черный
                    </a>
                  </li>
                </ul>
              </div>{" "}
              <p className={stylesHeader.headerTitle}>CHAT</p>
              <Link to="/profile" style={{ textDecoration: "none" }}>
                <button className={stylesHeader.btnToCab}>
                  Войти в личный кабинет
                </button>
              </Link>
            </div>
          );
        }}
      </ThemeContext.Consumer>
      {/*<p className={stylesHeader.headerTitle}>CHAT</p>*/}
    </>
  );
}
