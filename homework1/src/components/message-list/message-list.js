import { InputAdornment, TextField, withStyles } from "@material-ui/core";
import { Send } from "@material-ui/icons";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearMessageValue, handleChangeMessageValue } from "../../store/conversations";
import { sendMessage } from "../../store/messages";
import { Message } from "./message";
import stylesMessages from "./messageList.module.css";

// const user = { text: "Чат: GB React 26.07" };

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "black", //цвет текста
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "black",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#b2dfee", //цвет изначальный
        border: "3 px solid #b2dfee",
      },
      "&:hover fieldset": {
        borderColor: "#b2dfee", //цвет при наведении
        backgroundColor: "#b2dfee",
        opacity: "30%",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#b2dfee",
      },
    },
  },
})(TextField);

export const MessageList = ({
  // messages,
  // value,
  // sendMessage,
  // handleChangeValue,
  sendMessageFromBot,
}) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const refBlock = useRef(null);
  const { roomId } = useParams();
  const messages = useSelector((state) => state.messages.messages[roomId] || []); //забираем комнаты из store, а если комнаты нет, вернем пустой массив

  //достаем из глобального состояния value - значение инпута
  const value = useSelector(
    (state) =>
      state.conversations.conversations.find((conversation) => conversation.title === roomId)
        ?.value || "",
  );
  console.log(value);
  //заменить useState на провайде!
  // const [m, setMessageList] = useState([]); //добавили поле стейта messageList - В нем будем хранить массив объектов сообщений, начальное значение - пустой массив
  // const [value2, setValue] = useState(""); //добавили поле стейта value - значение поля ввода, начальное значение - пустая строка
  //по клику на кнопку отправить будет выполняться функция
  const handleSendMessage = () => {
    if (value) {
      dispatch(sendMessage({ author: "User", message: value }, roomId));
      dispatch(clearMessageValue(roomId));
    }
    // setMessageList((state) => [
    //   ...state,
    //   { value, author: "user", date: new Date().toLocaleTimeString() },
    // ]); //добавляем в массив объект со свойством value, которое введет пользователь, и свойством author:user. State всегда будет обновляться
    // setValue(""); //обнуляем значение инпута
    // refBlock.current.scrollTop = 300;
    // console.log(refBlock.current);
  };

  //нам приходит ивент, у ивента есть свойство code
  const handlePressInput = ({ code }) => {
    if (code === "Enter") {
      handleSendMessage();
      // setMessageList((state) => [
      //   ...state,
      //   { value, author: "user", date: new Date().toLocaleTimeString() },
      // ]);
      // setValue("");
    }
  };

  //Функция для побочных эффектов
  useEffect(() => {
    const lastMessage = messages[messages.length - 1]; //найдем последнее сообщение
    const height = 870;
    let timerID;
    ref.current.focus();
    console.log(refBlock.current.scrollHeight);

    //Если высота страницы (870) < высоты прокрутки, то прокрутить вниз
    if (height < refBlock.current.scrollHeight) {
      window.scrollTo(0, 9999);
    }
    // const checkReading.read = this.scrollHeight - this.scrollTop === this.clientHeight;

    console.log(lastMessage?.author);
    // if (lastMessage?.author === "User") {
    //   //если последнее сообщение от юзера
    //   timerID = setTimeout(() => {
    //     sendMessageFromBot({
    //       author: "bot",
    //       message: "Привет, я бот",
    //       date: new Date().toLocaleTimeString(),
    //     });
    //   }, 1500);
    // }

    return function () {
      clearTimeout(timerID);
      console.log("таймер очищен");
    };
  }, [messages, sendMessageFromBot]); //в зависимости поставим массив сообщений
  // console.log(m, value2);

  //Меняем немного структуру: Вместо Value - message
  return (
    <>
      <div className={stylesMessages.chat} style={{ overflow: scroll }} ref={refBlock}>
        <div className={stylesMessages.message}>
          {messages.map((message, id) => (
            <Message key={id} {...message} date={message.date} />
          ))}
        </div>

        <CssTextField
          id="outlined-basic"
          inputRef={ref}
          onChange={(event) => dispatch(handleChangeMessageValue(event.target.value, roomId))} //изменили функцию
          autoFocus={true} //автофокусировка
          label="Введите сообщение"
          className={stylesMessages.text}
          variant="outlined"
          fullWidth={true}
          value={value}
          onKeyPress={handlePressInput}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                {value && <Send style={{ cursor: "pointer" }} onClick={handleSendMessage} />}
              </InputAdornment>
            ),
          }}
        />
      </div>
    </>
  );
};
