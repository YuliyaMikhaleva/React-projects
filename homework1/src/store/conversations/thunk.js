import debounce from "lodash.debounce";
import { db } from "../../api/firebase";
import {
  getConversationsError,
  getConversationsStart,
  getConversationsSuccess,
  handleChangeMessageValueError,
  handleChangeMessageValueStart,
  handleChangeMessageValueSuccess,
} from "./actions";

//получение списка бесед из бекенда
export const getConversationsFB = () => (dispatch) => {
  dispatch(getConversationsStart()); //вызов старта запроса
  db.ref("conversations")
    .get()
    .then((snapshot) => {
      try {
        const conversations = []; //изначально массив пустой
        snapshot.forEach((snapshot) => {
          conversations.push(snapshot.val()); //в этот массив conversations попадает снимок текущей базы данных
          //мы взяли по снэпшоту циклом прошли и запушили какждый элемент снэпшота к нам в массив
        });
        dispatch(getConversationsSuccess(conversations)); //вызов окончания запроса
      } catch (e) {
        dispatch(getConversationsError(e)); //вызов ошибки
        console.log(e);
      }
    });
};
//функция вызова API (debounce позволяет отправлять запрос не на каждое нажатие)
const cb = debounce(async ({ roomId, messageValue }) => {
  await db.ref("conversations").child(roomId).update({ title: roomId, value: messageValue });
}, 5000);

//изменение текста сообщения в инпуте (для перехода между мобильной и десктопной версии, например)
export const handleChangeMessageValueFB = (messageValue, roomId) => async (dispatch) => {
  await cb({ messageValue, roomId });
  try {
    dispatch(handleChangeMessageValueStart());
    dispatch(handleChangeMessageValueSuccess(messageValue, roomId));
  } catch (e) {
    dispatch(handleChangeMessageValueError(e));
  }
};
