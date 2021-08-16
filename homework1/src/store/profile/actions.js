import { TOGGLE_NAME_VISIBLE, EDIT_DATA, SAVE } from "./types";

//action = { type: string, payload: нагрузка - любое значение}
//action creator

//эта функция - это action creator.
//объект, который возвращает эта функция - это наш action

export const toggleNameVisible = () => ({ type: TOGGLE_NAME_VISIBLE });
export const editData = () => ({ type: EDIT_DATA });
export const save = () => ({ type: SAVE });
