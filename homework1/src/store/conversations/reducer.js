import { ADD_ROOM, CLEAR_MESSAGE_VALUE, HANDLE_CHANGE_MESSAGE_VALUE } from "./types";

const initialState = {
  conversations: [
    { title: "room1", value: "test value 1" },
    { title: "room2", value: "test value 2" },
  ],
};

export const conversationsReducer = (state = initialState, action) => {
  //мы посмотрим что action у нас пришел с типом
  switch (action.type) {
    case HANDLE_CHANGE_MESSAGE_VALUE:
      return {
        ...state,
        conversations: state.conversations.map((conversation) => {
          return conversation.title === action.payload.roomId
            ? { ...conversation, value: action.payload.value }
            : conversation;
        }),
      };
    case CLEAR_MESSAGE_VALUE:
      return {
        ...state,
        conversations: state.conversations.map((conversation) => {
          return conversation.title === action.payload
            ? { ...conversation, value: "" }
            : conversation;
        }),
      };
    case ADD_ROOM:
      return {
        ...state,
        conversations: [
          ...state.conversations,
          {
            title: `room ${state.conversations.length + 1}`,
            value: `test value${state.conversations.length + 1}`,
          },
        ],
      };
    default:
      //по умолчанию если у нас нету такого типа
      return state; //мы вернем state
  }
};
