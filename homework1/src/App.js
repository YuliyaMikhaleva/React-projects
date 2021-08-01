import {createElement, Component} from "react";

import styles from "./app.module.css";

const user = {text: "Текст сообщения внутри App"};


export function App() {
  return (
    <div className={styles.app}>
        <Message user={user} />
    </div>
  );
}

//Создадим компонент Message, отображающий переданный ему пропсом текст (можно его создать в отдельном файле, тогда еще импортировать)

export function Message(props) {
    console.log(props);
    return (
            <p className={styles.message}> {props.user.text} </p>
    );
}

