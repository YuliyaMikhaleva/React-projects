//здесь будут все наши комнаты в которых мы общаемся
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { useState } from "react";
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
      <ListItemText
        className={stylesChats.listItem}
        primary={`Чат ${index + 1}`}
      />
    </ListItem>
  );
}

renderRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

export const ChatList = () => {
  const [chats, setChats] = useState([
    { name: "room 1", id: 1 },
    { name: "room 2", id: 2 },
    { name: "room 3", id: 3 },
  ]);
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const addRoom = () => {
    const index = chats.length + 1;
    setChats((state) => [...state, { name: `room ${index}`, id: index }]);
  };
  return (
    <>
      <div className={classes.root}>
        <List component="nav" aria-label="secondary mailbox folder">
          {chats.map((chat, index) => (
            <ListItem
              key={index}
              button={true}
              selected={selectedIndex === index}
              onClick={(event) => handleListItemClick(event, index)}
            >
              <ListItemText
                className={stylesChats.listItem}
                primary={chat.name}
              />
            </ListItem>
          ))}
        </List>
      </div>
      <button className={stylesChats.buttonAdd} onClick={addRoom}>
        Add room
      </button>
    </>
  );
};
