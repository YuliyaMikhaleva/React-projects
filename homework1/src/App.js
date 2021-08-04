// import { createElement, Component } from "react";
import {useEffect, useState} from "react";
import styles from "./app.module.css";


const user = {text: "Чат"};

export function App() {
    const [messageList, setMessageList] = useState([]);//добавили поле стейта messageList - В нем будем хранить массив объектов сообщений, начальное значение - пустой массив
    const [value, setValue] = useState("");//добавили поле стейта value - значение поля ввода, начальное значение - пустая строка
    //по клику на кнопку отправить будет выполняться функция
    const handleSendMessage = () => {
        setMessageList(state => [...state, {value, author: "user"}]);//добавляем в массив объект со свойством value, которое введет пользователь, и свойством author:user. State всегда будет обновляться
        setValue("");//обнуляем значение инпута
    }

    //нам приходит ивент, у ивента есть свойство code
    const handlePressInput = ({code}) => {
        if (code === "Enter") {
            setMessageList(state => [...state, {value, author: "user"}]);
            setValue("")
        }
    }
    //Функция для побочных эффектов
    useEffect(()=>{
        const lastMessage = messageList[messageList.length - 1];//найдем последнее сообщение
        if (lastMessage?.author === "user"){//если последнее сообщение от юзера
            setTimeout(()=>{
                setMessageList(state => [...state, {value: "Привет, я бот!", author:"bot"}])//обновим массив сообщений добавляя сообщение от бота
            }, 1500)
        }
    }, [messageList])//в зависимости поставим массив сообщений
    return (
        <div className={styles.app}>
            <Message user={user}/>
            <ul>
                {messageList.map((message, id) => (<li key={id}>{message.author}:{message.value}</li>))}
            </ul>
            <input value={value} onChange={(event) => {
                setValue(event.target.value)
            }} onKeyPress={handlePressInput}/>
            <button className={styles.buttonMessage} onClick={handleSendMessage}>Отправить сообщение</button>
        </div>
    );
}

//Создадим компонент Message, отображающий переданный ему пропсом текст (можно его создать в отдельном файле, тогда еще импортировать)

export function Message(props) {
    console.log(props);
    return <p className={styles.message}> {props.user.text} </p>;
}
