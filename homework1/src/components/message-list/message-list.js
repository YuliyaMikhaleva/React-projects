import {InputAdornment, TextField, withStyles} from '@material-ui/core';
import {Send} from "@material-ui/icons";
import React, {useEffect, useState, useRef} from "react";
import {Message} from "../../App";
import stylesMessages from "./messageList.module.css";
const user = {text: "Чат: GB React 26.07"};
const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'black',//цвет текста
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'black',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#b2dfee',//цвет изначальный
                border: '3 px solid #b2dfee'
            },
            '&:hover fieldset': {
                borderColor: '#b2dfee',//цвет при наведении
                backgroundColor: '#b2dfee',
                opacity: '30%',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#b2dfee',
            },
        },
    },
})(TextField);
export const MessageList = () => {
    const ref = useRef(null);
    const [messages, setMessageList] = useState([]);//добавили поле стейта messageList - В нем будем хранить массив объектов сообщений, начальное значение - пустой массив
    const [value, setValue] = useState("");//добавили поле стейта value - значение поля ввода, начальное значение - пустая строка
    //по клику на кнопку отправить будет выполняться функция
    const handleSendMessage = () => {
        setMessageList(state => [...state, {value, author: "user", date: new Date().toLocaleTimeString()}]);//добавляем в массив объект со свойством value, которое введет пользователь, и свойством author:user. State всегда будет обновляться
        setValue("");//обнуляем значение инпута
    }

    //нам приходит ивент, у ивента есть свойство code
    const handlePressInput = ({code}) => {
        if (code === "Enter") {
            setMessageList(state => [...state, {value, author: "user", date: new Date().toLocaleTimeString()}]);
            setValue("")
        }
    }
    //Функция для побочных эффектов
    useEffect(()=>{
        const lastMessage = messages[messages.length - 1];//найдем последнее сообщение
        let timerID;
        ref.current.focus();
        if (lastMessage?.author === "user") {//если последнее сообщение от юзера
            timerID = setTimeout(() => {
                setMessageList(state => [...state, {value: "Привет, я бот!", author: "bot", date: new Date().toLocaleTimeString()}])//обновим массив сообщений добавляя сообщение от бота
            }, 1500);
        }
            return function () {
                clearTimeout(timerID);
                console.log('таймер очищен')
            }
    }, [messages])//в зависимости поставим массив сообщений
    return (
        <div className={stylesMessages.chat}>
            <Message className={stylesMessages.title} user={user}/>
            <div className={stylesMessages.message}>
                {messages.map((message, id) => (
                    // eslint-disable-next-line react/jsx-key
                    <p className={stylesMessages.blockMessage}>
                        <p className={stylesMessages.textMessage} key={id}><span
                            className={stylesMessages.userName}>{message.author}</span> : {message.value} </p>
                        <span className={stylesMessages.date}>{message.date}</span>
                    </p>
                    ))}
            </div>
            <CssTextField id="outlined-basic"
                          inputRef={ref}
                          autoFocus={true} //автофокусировка
                          label="Введите сообщение"
                          className={stylesMessages.text}
                          variant="outlined"
                          fullWidth={true}
                          value={value}
                          onChange={(event) => {
                              setValue(event.target.value)
                          }}
                          onKeyPress={ handlePressInput
                          }
                          InputProps={{
                              endAdornment: (
                                  <InputAdornment>
                                      <Send onClick={handleSendMessage}/>
                                  </InputAdornment>
                              ),
                          }}
            />
        </div>
    );
}