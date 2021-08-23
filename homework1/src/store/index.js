import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { conversationsReducer } from "./conversations"; //импортируем profileReducer
import { messagesReducer } from "./messages";
import { logger, botSendMessage, timeoutScheduler, report } from "./middlewares";
import { profileReducer } from "./profile";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["conversations", "messages"], //те редюссеры, которые НЕ будут сохранены
  whitelist: ["profile"], //те редюссеры, которые будут сохранены
};
//все наши редюссеры должны проходить через persistReducer, чтобы сохраняться
const persistreducer = persistReducer(
  persistConfig,
  combineReducers({
    profile: profileReducer,
    conversations: conversationsReducer,
    messages: messagesReducer,
  }),
);

export const store = createStore(
  persistreducer,
  compose(
    applyMiddleware(report, thunk, logger, botSendMessage, timeoutScheduler),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
); //создали наше хранилище и передаем в него counterReducer

export const persistore = persistStore(store); // передаем персистору наш текущий стор
