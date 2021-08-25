import { sendMessage } from "../messages";
import { SEND_MESSAGE } from "../messages/types";

export const botSendMessage = (store) => (next) => (action) => {
  if (action.type === SEND_MESSAGE && action.payload.message.author === "User") {
    setTimeout(() => {
      store.dispatch(
        sendMessage(
          {
            author: "bot",
            message: "Hello from bot middleware",
            date: new Date().toLocaleTimeString(),
          },
          action.payload.roomId,
        ),
      );
    }, 500);
  }
  return next(action);
};
