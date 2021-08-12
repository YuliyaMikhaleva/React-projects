//Это будет просто компонент, который будет возвращать рендер-пропс - чилдрена своего
//всё, что нам нужно сделать - это передать этому чилдрену что-то
import { useState, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";

export function MessageProvider({ children }) {
  // const params = useParams;
  const { roomId } = useParams();
  // console.log(roomId);

  //у комнаты будет название и value. Value сохраняем в комнату для того, чтобы при переключении между комнатами,
  // у нас не терялось то, что у нас в инпуте

  const [conversations, setConversations] = useState([
    { title: "room1", value: "test value 1" },
    { title: "room2", value: "test value 2" },
  ]); //переписки

  //сообщения будем хранить объектом с ключами
  //свойства каждого объекта - это будут сообщения конкретной комнаты
  const [messages, setMessages] = useState({
    room1: [], //для теста
    room2: [], //для теста
  }); //сообщения
  // const [messages, setMessages] = useState({
  //   room1: [{ message: "Привет!", author: "user", date: new Date() }], //для теста
  //   room2: [{ message: "Привет room2!", author: "user", date: new Date() }], //для теста
  // }); //сообщения
  // console.log(params); //посмотрим что у нас в параметрах: айдишник конкретно то, что мы передали в roomId (после слеша)

  // useEffect(() => {
  //   const lastMessage = messages[messages.length - 1]; //найдем последнее сообщение
  //   // const timerID
  //   if (lastMessage?.author === "User") {
  //     //если последнее сообщение от юзера
  //     setTimeout(() => {
  //       setMessages((messages) => [
  //         ...messages,
  //         {
  //           value: "Привет, я бот!",
  //           author: "bot",
  //           date: new Date().toLocaleTimeString(),
  //         },
  //       ]); //обновим массив сообщений добавляя сообщение от бота
  //     }, 1500);
  //   }
  // });

  const updateConversations = useCallback(
    (value = "") => {
      setConversations((conversations) =>
        conversations.map((conversation) => {
          return conversation.title === roomId
            ? { ...conversation, value }
            : conversation;
        }),
      );
    },
    [roomId],
  );

  //в стейте должно быть сообщения и какая-то комната
  //передаем все наши беседы, но сообщения нас не интересуют все, нас интересуют сообщения конкретной комнаты
  //(получаем объект по ключу - через поиск по roomId)
  //если нет такой комнаты, то возвращаем пустой массив (если нет сообщений еще)
  const state = useMemo(() => {
    return {
      conversations, // все беседы
      allMessages: messages,
      messages: messages[roomId] || [], //по ключу получить конкретный массив сообщений конкретной комнаты
      value:
        conversations.find((conversation) => conversation.title === roomId)
          ?.value || "", //объект получим по имени комнаты
      hasRoomById: Object.keys(messages).some((room) => room === roomId),
    };
  }, [conversations, messages, roomId]);

  //в экшенах мы сделаем апдейт комнат, и апдейт value
  const actions = useMemo(() => {
    return {
      //будет принимать новое сообщение, в котором будет message и author ({ message, author}) =>
      //нужно в messages найти сообщение для обновления по roomId и запушить новое сообщение в найденный массив
      //отправить сообщение
      sendMessage: (message) => {
        const newMessage = {
          ...message,
          date: new Date().toLocaleTimeString(),
        };
        setMessages((messages) => {
          return {
            ...messages,
            [roomId]: [...(messages[roomId] || []), newMessage],
          };
        });
        updateConversations();
      },
      sendMessageFromBot: (message) => {
        setMessages((messages) => {
          return {
            ...messages,
            [roomId]: [...(messages[roomId] || []), message],
          };
        });
      },
      handleChangeValue: (e) => {
        const { value } = e.target;
        updateConversations(value); //обновить список бесед
      },
      addRoom: () => {
        setConversations((conversations) => {
          const index = conversations.length + 1;
          console.log(conversations);
          return [
            ...conversations,
            { title: `room${index}`, value: `test value${index} ` },
          ];
        });
      },
    };
    // eslint-disable-next-line
  }, [roomId, updateConversations]);

  //чтобы мы понимали в какой массив сообщений мы должны пушить новое сообщение

  //будет принимать Value или event (value / event)
  //нужно найти комнату conversations по roomId и в найденной комнате обновить value

  return children([state, actions]); //распространенная модель, когда первым передаем state, а вторым - действие
}

//чтобы переключить комнату и получить текущую комнату, нам нужно использовать хук useParams
