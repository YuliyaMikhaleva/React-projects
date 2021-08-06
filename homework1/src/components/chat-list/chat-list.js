//здесь будут все наши комнаты в которых мы общаемся
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from "react";
// eslint-disable-next-line no-unused-vars
import {FixedSizeList} from 'react-window';
import stylesChats from "./chatList.module.css"

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        maxWidth: 360,
        // backgroundColor: theme.palette.background.paper,
    },
}));

function renderRow(props) {
    const {index, style} = props;
    return (
        <ListItem button={true} style={style} key={index}>
            <ListItemText className={stylesChats.listItem} primary={`Чат ${index + 1}`}/>
        </ListItem>
    );
}

renderRow.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
};

export const ChatList = () => {
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };
    return (
        <div className={classes.root}>
            <List component="nav" aria-label="secondary mailbox folder">
                <ListItem
                    button={true}
                    selected={selectedIndex === 1}
                    onClick={(event) => handleListItemClick(event, 1)}
                >
                    <ListItemText className={stylesChats.listItem} primary="Чат 1" />
                </ListItem>
                <ListItem
                    button={true}
                    selected={selectedIndex === 2}
                    onClick={(event) => handleListItemClick(event, 2)}
                >
                    <ListItemText className={stylesChats.listItem} primary="Чат 2" />
                </ListItem>
                <ListItem
                    button={true}
                    selected={selectedIndex === 3}
                    onClick={(event) => handleListItemClick(event, 3)}
                >
                    <ListItemText className={stylesChats.listItem} primary="Чат 3" />
                </ListItem>
                <ListItem
                    button={true}
                    selected={selectedIndex === 4}
                    onClick={(event) => handleListItemClick(event, 4)}
                >
                    <ListItemText className={stylesChats.listItem} primary="Чат 4" />
                </ListItem>
            </List>
        </div>
    );
}