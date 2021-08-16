import { createStore } from "redux";
import { profileReducer } from "./profile"; //импортируем profileReducer

export const store = createStore(profileReducer); //создали наше хранилище и передаем в него counterReducer
