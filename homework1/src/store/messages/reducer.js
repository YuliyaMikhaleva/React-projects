import { SEND_MESSAGE } from "./types";

const initialState = {
  messages: {
    room1: [{ author: "bot", message: "Привет, я бот 1", date: new Date().toLocaleTimeString() }],
    room2: [{ author: "bot", message: "Привет, я бот 2", date: new Date().toLocaleTimeString() }],
  },
};

export const messagesReducer = (state = initialState, action) => {
  //мы посмотрим что action у нас пришел с типом
  switch (action.type) {
    case SEND_MESSAGE:
      return {
        //мы что-то делаем со стоянием
        ...state,
        messages: {
          ...state.messages,
          [action.payload.roomId]:
            [
              ...(state.messages[action.payload.roomId] || []),
              { ...action.payload.message, date: new Date().toLocaleTimeString() },
            ] || [],
        },
      };

    default:
      //по умолчанию если у нас нет такого типа
      return state; //мы вернем state
  }
};
