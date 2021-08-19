//здесь будут все наши комнаты в которых мы общаемся
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addRoom } from "../../store/conversations";
import stylesChats from "./chatList.module.css";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    maxWidth: 360,
  },
}));

function renderRow(props) {
  const { index, style } = props;
  return (
    <ListItem button={true} style={style} key={index}>
      <ListItemText className={stylesChats.listItem} primary={`Чат ${index + 1}`} />
    </ListItem>
  );
}

renderRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

//к нам приходят сonversations
//пока уберем из пропсов {allMessages, addRoom}
export const ChatList = () => {
  const state = useSelector((state) => state.conversations.conversations);
  console.log(state);
  const store = useSelector((state) => state.conversations); //массив из 2х комнат
  console.log(store);
  const dispatch = useDispatch();

  // const [chats, setChats] = useState([
  //   { name: "room 1", id: 1 },
  //   { name: "room 2", id: 2 },
  //   { name: "room 3", id: 3 },
  // ]);
  const classes = useStyles();
  const { roomId } = useParams();
  const { conversations } = useSelector((state) => state.conversations); //Мы вытаскиваем комнаты из store
  const messages = useSelector((state) => state.messages.messages);
  // const lastMessage = messages[messages?.length - 1];
  // console.log(lastMessage);
  // const addRoom = () => {
  //   const index = chats.length + 1;
  //   setChats((state) => [...state, { name: `room ${index}`, id: index }]);
  // };

  //теперь перебираем conversations, а не массив заранее определенных бесед
  return (
    <div className={classes.root}>
      <List component="nav" aria-label="secondary mailbox folder">
        {conversations.map((chat, index) => {
          //на каждой итерации комнат берем и получаем всю историю ее сообщений

          const currentMessages = messages[chat.title] || []; //получаем сообщение по названию комнаты; если комнаты нет, то пустой массив
          const lastMessage = currentMessages[currentMessages?.length - 1]; //получаем последнее сообщение
          console.log(lastMessage);

          return (
            <Link className={stylesChats.listItemLink} key={index} to={`/chat/${chat.title}`}>
              <ListItem key={index} button={true} selected={roomId === chat.title}>
                <ListItemText
                  className={stylesChats.chatName}
                  primary={chat.title} //было chat.name
                />
                {lastMessage && (
                  <ListItemText
                    className={stylesChats.listItem}
                    primary={`${lastMessage.author}:${lastMessage.message}`} //и выводим последнее сообщение в верстку
                  />
                )}
              </ListItem>
            </Link>
          );
        })}
      </List>
      <button
        className={stylesChats.btn}
        onClick={() => {
          dispatch(addRoom());
        }}
      >
        Добавить беседу
      </button>
    </div>
  );
};
