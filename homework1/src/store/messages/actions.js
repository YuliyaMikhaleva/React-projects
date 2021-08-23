import { SEND_MESSAGE, EDIT_MESSAGE } from "./types";

//action creator возвращает объект
export const sendMessage = (message, roomId) => ({
  type: SEND_MESSAGE,
  payload: { message, roomId },
  meta: { delay: 500 },
});

export const editMessage = (oldMessageId, roomId, newMessage) => ({
  type: EDIT_MESSAGE,
  payload: { oldMessageId, roomId, newMessage },
});
