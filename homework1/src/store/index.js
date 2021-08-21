import { combineReducers, createStore } from "redux";
import { conversationsReducer } from "./conversations"; //импортируем profileReducer
import { messagesReducer } from "./messages";
import { profileReducer } from "./profile";

export const store = createStore(
  combineReducers({
    profile: profileReducer,
    conversations: conversationsReducer,
    messages: messagesReducer,
  }),
); //создали наше хранилище и передаем в него counterReducer
