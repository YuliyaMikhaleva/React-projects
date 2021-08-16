import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../profile.module.css";
import { save, toggleNameVisible, editData } from "../store/profile";

//вёрстка параметров в режиме просмотра
function View(props) {
  // const dispatch = useDispatch();
  return (
    <div>
      <span>{props.children}</span> {props.value}
    </div>
  );
}

//вёрстка параметров в режиме редактирования
function Edit(props) {
  return (
    <div>
      <label htmlFor="users">{props.children}</label>
      <input
        className={styles.input}
        key={props.value}
        id="users"
        defaultValue={props.value}
        type="text"
      ></input>
    </div>
  );
}

function Profile() {
  const inputName = "Имя:";
  const inputSoname = "Фамилия:";
  const inputAge = "Возраст:";
  const inputBirthday = "Дата рождения:";
  const { firstName } = useSelector((state) => state.user || {}); //вытаскиваем данные по ключу
  const { soName } = useSelector((state) => state.user || {});
  const { age } = useSelector((state) => state.user || {});
  const { birthDay } = useSelector((state) => state.user || {});
  const nameVisible = useSelector((state) => state.nameVisible); //вытаскиваем данные
  const edit = useSelector((state) => state.edit); //вытаскиваем данные
  const dispatch = useDispatch();
  const refBlock = useRef(null);

  return (
    <div className={styles.pageProfile}>
      <div className={styles.profile}>
        <img
          className={styles.profileLogo}
          src={process.env.PUBLIC_URL + "/logoDialog.png"}
          width="200"
        />
        <h1 className={styles.profileTitle}>Личный кабинет</h1>
        <button
          className={styles.profileBtn}
          onClick={() => {
            dispatch(toggleNameVisible());
          }}
        >
          Показать / Скрыть
        </button>
        {nameVisible && (
          <div ref={refBlock}>
            {edit ? (
              <div>
                <Edit value={firstName}>{inputName}</Edit>
                <Edit value={soName}>{inputSoname}</Edit>
                <Edit value={age}>{inputAge}</Edit>
                <Edit value={birthDay}>{inputBirthday}</Edit>
                <button
                  className={styles.btnEditSave}
                  onClick={() => {
                    dispatch(save());
                  }}
                >
                  Сохранить
                </button>
              </div>
            ) : (
              <div>
                <View value={firstName}>{inputName}</View>
                <View value={soName}>{inputSoname}</View>
                <View value={age}>{inputAge}</View>
                <View value={birthDay}>{inputBirthday}</View>
                <button
                  className={styles.btnEditSave}
                  onClick={() => {
                    dispatch(editData());
                  }}
                >
                  Редактировать
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <Link to="/chat" style={{ textDecoration: "none" }}>
        <button className={styles.btnToChat}>Вернуться в чат</button>
      </Link>
    </div>
  );
}

export default Profile;
