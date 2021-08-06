// import { makeStyles} from '@material-ui/core';
import {Grid , makeStyles} from '@material-ui/core';
import React from "react";
// import styles from "./app.module.css";
import styles from "./app.module.css"
import {ChatList, MessageList} from "./components";
import stylesChats from "./components/chat-list/chatList.module.css"
import stylesMessages from "./components/message-list/messageList.module.css"

// eslint-disable-next-line no-unused-vars
// import {ChatList, MessageList} from "./components";



const useStyles = makeStyles((theme) => {
    console.log(theme)
    return {
        root: {
            flexGrow: 1,
            background: theme.light.color,
        },
    }
});




export function App() {
    const classes = useStyles();//В компоненте используем хук useStyles
    return (
        <>
            <div className={classes.root}>
                <Grid container={true} className={styles.app}>
                    <Grid item={true} xs={2} className={stylesChats.chatList}>
                        <ChatList />
                    </Grid>
                    <Grid item={true} xs={10} className={stylesMessages.messageList}>
                        <MessageList />
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

//Создадим компонент Message, отображающий переданный ему пропсом текст (можно его создать в отдельном файле, тогда еще импортировать)

export function Message(props) {
    console.log(props);
    return <p className={stylesMessages.title}> {props.user.text} </p>;
}


// <input value={value} onChange={(event) => {
//     setValue(event.target.value)
// }} onKeyPress={handlePressInput}/>

// <Button variant="contained" color="primary" className={styles.buttonMessage} onClick={handleSendMessage}>Отправить сообщение</Button>