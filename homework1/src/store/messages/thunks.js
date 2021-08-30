import { clearMessageValue } from "../conversations";
import { sendMessage } from "./actions";

//thunk возвращает функцию, которую надо вызвать
//thunk первым арументом принимает всё то же самое, что принимает action, обычная нагрузка,
// а вторым аргументом он принимает всё то, что мы передали в него, это dispatch и getState -
// и третий аргумент exraArgument (Всё, чьл мы пеоежади методом withExtraArgument внутри createStore, опаадет к нам в thunk
export const sendMessageWithThunk = (message, roomId) => (dispatch) => {
  dispatch(sendMessage(message, roomId)); //вызывается функция отправки нашего сообщения
  dispatch(clearMessageValue(roomId)); // очистка инпута

  if (message.author === "User") {
    setTimeout(
      () => dispatch(sendMessage({ author: "bot", message: "Hello from bot thunk" }, roomId)), //сообщение бота
      1000,
    );
  }
};
