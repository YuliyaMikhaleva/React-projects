import debounce from "lodash.debounce";
import {nanoid} from "nanoid";
import {useSelector} from "react-redux";
import { db } from "../../api/firebase";
import {
  getConversationsError,
  getConversationsStart,
  getConversationsSuccess,
  handleChangeMessageValueError,
  handleChangeMessageValueStart,
  handleChangeMessageValueSuccess,
  addRoomStart,
  addRoomSuccess,
  addRoomError,
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

//получение списка бесед из бекенда
export const addConversationsFB = () => (dispatch) => {
  dispatch(addRoomStart()); //вызов старта запроса
  const res = db.ref("conversations").child(`room ${nanoid()}`)
      .set(
          {
            title: `room ${nanoid()}`,
            value: `test value${nanoid()}`,
          }
          )
      if (res) {
        try {
          console.log(res.key)
          dispatch(addRoomSuccess());
        } catch (e) {
          dispatch(addRoomError(e));
          console.log(e);
        }
      }

};

db.ref("conversations").child('room1').set({title:"room1", value:"test1"})