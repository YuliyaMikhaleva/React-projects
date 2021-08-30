import {
  HANDLE_CHANGE_MESSAGE_VALUE_START,
  HANDLE_CHANGE_MESSAGE_VALUE_SUCCESS,
  HANDLE_CHANGE_MESSAGE_VALUE_ERROR,
  CLEAR_MESSAGE_VALUE,
  ADD_ROOM,
  DELETE_ROOM,
  EDIT_NAME_ROOM,
  GET_CONVERSATIONS_START,
  GET_CONVERSATIONS_SUCCESS,
  GET_CONVERSATIONS_ERROR,
} from "./types";

// export const handleChangeMessageValue = (value, roomId) => ({
//   type: HANDLE_CHANGE_MESSAGE_VALUE,
//   payload: { value, roomId },
// });
export const handleChangeMessageValueStart = () => ({
  type: HANDLE_CHANGE_MESSAGE_VALUE_START,
});
export const handleChangeMessageValueSuccess = (value, roomId) => ({
  type: HANDLE_CHANGE_MESSAGE_VALUE_SUCCESS,
  payload: { value, roomId },
});
export const handleChangeMessageValueError = (error) => ({
  type: HANDLE_CHANGE_MESSAGE_VALUE_ERROR,
  payload: error,
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

export const getConversationsStart = () => ({
  type: GET_CONVERSATIONS_START,
});
export const getConversationsSuccess = (conversations) => ({
  type: GET_CONVERSATIONS_SUCCESS,
  payload: conversations,
});
export const getConversationsError = (error) => ({
  type: GET_CONVERSATIONS_ERROR,
  payload: error,
});
