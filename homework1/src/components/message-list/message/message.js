import classNames from "classnames";
import React from "react";
import stylesMessages from "../messageList.module.css";

export function Message({ author, message, date }) {
  return (
    <div>
      <p
        className={classNames(stylesMessages.blockMessage, {
          [stylesMessages.blockMessageBot]: author === "bot",
        })}
      >
        <p className={stylesMessages.textMessage}>
          <span className={stylesMessages.userName}>{author}</span>: {message}{" "}
        </p>
        <p className={stylesMessages.date}>{`${date}`}</p>
      </p>
    </div>
  );
}
