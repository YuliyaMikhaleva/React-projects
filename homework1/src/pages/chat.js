import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { Layout, ChatList, MessageList } from "../components";
import stylesPage from "./page.module.css";
export function Chat() {
  const { push } = useHistory();

  useEffect(() => {
    const listenExistChat = ({ code }) => {
      if (code === "Escape") {
        push("/chat");
      }
    };
    document.addEventListener("keydown", listenExistChat);
    return () => {
      document.removeEventListener("keydown", listenExistChat);
    };
  }, [push]);
  //комнаты динамические, поэтому  мы делаем такую запись. А массивом мы можем передать вот так.
  //то есть мы говорим нашему роуту, что ты должен отработать в том случае, если ты находишься на пути
  // "/chat/:roomId" или на пути "/chat"
  return (
    <Switch>
      <Route exact={true} path={["/chat/:roomId", "/chat"]}>
        <Layout chats={<ChatList />}>
          <Route path="/chat/:roomId">
            <MessageList />
          </Route>
          <Route exact={true} path="/chat">
            <h1 className={stylesPage.title}>Выберите диалог</h1>
            <img
              className={stylesPage.img}
              src={process.env.PUBLIC_URL + "/logoDialog.png"}
              width="50"
            />
          </Route>
        </Layout>
      </Route>
      <Route path="*">
        <h1>такого чата нет</h1>
      </Route>
    </Switch>
  );
}

//теперь по пути "/chat/:roomId" рендерится наш чат
//выходим из всех чатов на путь ="/chat" – у нас отрендерился компонент «Выберите сообщение»
