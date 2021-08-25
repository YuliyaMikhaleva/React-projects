import {
  HANDLE_CHANGE_MESSAGE_VALUE,
  CLEAR_MESSAGE_VALUE,
  ADD_ROOM,
  DELETE_ROOM,
  EDIT_NAME_ROOM,
} from "./types";

export const handleChangeMessageValue = (value, roomId) => ({
  type: HANDLE_CHANGE_MESSAGE_VALUE,
  payload: { value, roomId },
});
export const clearMessageValue = (roomId) => ({
  type: CLEAR_MESSAGE_VALUE,
  payload: roomId,
});
export const addRoom = () => ({
  type: ADD_ROOM,
});
export const deleteRoom = (oldTitleId) => ({
  type: DELETE_ROOM,
  payload: oldTitleId,
});
export const editNameRoom = (oldTitleId, newTitle) => ({
  type: EDIT_NAME_ROOM,
  payload: { oldTitleId, newTitle },
});
