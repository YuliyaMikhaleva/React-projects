import { nanoid } from "nanoid";
import {
  ADD_ROOM,
  CLEAR_MESSAGE_VALUE,
  DELETE_ROOM,
  EDIT_NAME_ROOM,
  HANDLE_CHANGE_MESSAGE_VALUE,
} from "./types";

const initialState = {
  conversations: [
    { id: nanoid(), title: "room1", value: "test value 1" },
    { id: nanoid(), title: "room2", value: "test value 2" },
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
            ? { ...conversation, value: action.payload.value, id: nanoid() }
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
            id: nanoid(),
            title: `room ${state.conversations.length + 1}`,
            value: `test value${state.conversations.length + 1}`,
          },
        ],
      };
    case DELETE_ROOM:
      return {
        ...state,
        conversations: state.conversations.filter(
          (conversation) => conversation.id !== action.payload,
        ),
      };
    case EDIT_NAME_ROOM:
      return {
        ...state,
        conversations: [...state.conversations].map((conversation) => {
          return conversation.id === action.payload.oldTitleId
            ? { ...conversation, title: action.payload.newTitle }
            : conversation;
        }),
      };
    default:
      //по умолчанию если у нас нету такого типа
      return state; //мы вернем state
  }
};
