//здесь будут все наши комнаты в которых мы общаемся


// export const ChatList = () =>{
//     const [list] = useState([{name: "GB React 26.07", id: 1203040}, {name: "Друзья", id: 1122344}, {name: "Меридиан", id: 1203040}, {name: "Маша", id: 1203040},]);//добавили поле стейта messageList - В нем будем хранить массив объектов сообщений, начальное значение - пустой массив
//
//     return(
//     <div>
//         <p className={stylesChats.title}>Ваши беседы</p>
//         {list.map((listItem, id) => (
//             <div className={stylesChats.listItem} key={id}>
//                 <p className={stylesChats.dialog}>{listItem.name}:{listItem.id}</p>
//             </div>))}
//     </div>
//     )
// }
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from "react";
import {FixedSizeList} from 'react-window';
import stylesChats from "./chatList.module.css"

const useStyles = makeStyles(() => ({
    root: {
        width: '20%',
        height: 400,
        maxWidth: 640,
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

    return (
        <div className={classes.root}>
            <FixedSizeList height={400} width={200} itemSize={46} itemCount={8}>
                {renderRow}
            </FixedSizeList>
        </div>
    );
}