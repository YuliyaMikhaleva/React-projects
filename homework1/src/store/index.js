import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { getGistsApi, searchGistsByUserNameApi } from "../api/gists";
import { gistsAnimeReducer } from "./animegists";
import { conversationsReducer } from "./conversations"; //импортируем profileReducer
import { gistsReducer } from "./gists";
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
    gists: gistsReducer,
    anime: gistsAnimeReducer,
  }),
);

export const store = createStore(
  persistreducer,
  compose(
    applyMiddleware(
      report,
      thunk.withExtraArgument({ getGistsApi, searchGistsByUserNameApi }), //всё, что передаем в этот метод, попадет третьим параметром в thunk
      logger,
      botSendMessage,
      timeoutScheduler,
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
); //создали наше хранилище и передаем в него counterReducer

export const persistore = persistStore(store); // передаем персистору наш текущий стор
