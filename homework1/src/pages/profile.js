import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../profile.module.css";
import { save, toggleNameVisible, editData, editUser } from "../store/profile";

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
        id="users"
        defaultValue={props.value}
        type="text"
        onChange={props.onChange}
      />
    </div>
  );
}

//создаем пользовательский хук - значение инпута - некая форма - функция, которая
//принимает начальное значение состояния, name (свойство в сторе) и колбек ( любая функция, которую мы передаем в аргументы)
//мы хотим вызвать эту функцию после того, как изменится значение в инпуте
export const useFormInput = function (initialValue, name, callback) {
  //начальное состояние инпута = initialValue
  const [value, setValue] = useState(initialValue); //value - настоящее состояние, изменить можно через setValue

  //функция клика принимает event.target (то что мы ввели)
  const handleChange = function (e) {
    setValue(e.target.value); //и изменяет настоящее состояние значение на то что мы ввели
    try {
      //проверяем, есть ли у нас колбек - какой-то внешний аргумент
      callback && callback({ value: e.target.value, name }); //меняем значение на то что мы ввели и запоминаем имя поля, в которое мы это ввели
    } catch (err) {
      console.log(err); //иначе выводим ошибку
    }
  };

  return {
    //возвращаем значение, название и функцию по клику
    value,
    name,
    onChange: handleChange, //вот этот слушатель вставим в инпут редактирования параметров
  };
};

function Profile() {
  const { firstName, soName, age, birthDay } = useSelector(
    (state) => state.user,
  ); //вытаскиваем данные по ключу

  const firstNameInput = useFormInput(firstName, "firstName"); //firstName - начальное значение нашего поля, свойство в сторе - "firstName" и тд
  const soNameInput = useFormInput(soName, "soName");
  const ageInput = useFormInput(age, "age");
  const birthDayInput = useFormInput(birthDay, "birthDay");

  const inputName = "Имя:";
  const inputSoname = "Фамилия:";
  const inputAge = "Возраст:";
  const inputBirthday = "Дата рождения:";

  const nameVisible = useSelector((state) => state.nameVisible); //вытаскиваем данные
  const edit = useSelector((state) => state.edit); //вытаскиваем данные
  const dispatch = useDispatch();
  // const refBlock = useRef(null);
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
          <div>
            {/*//в режиме редактирования будет этот блок*/}
            {edit ? (
              <div>
                <Edit {...firstNameInput}>{inputName}</Edit>
                <Edit {...soNameInput}>{inputSoname}</Edit>
                <Edit {...ageInput}>{inputAge}</Edit>
                <Edit {...birthDayInput}>{inputBirthday}</Edit>
                <button
                  className={styles.btnEditSave}
                  onClick={() => {
                    alert("сохранено");
                    console.log({ firstNameInput });
                    dispatch(
                      editUser({
                        firstName: firstNameInput.value,
                        soName: soNameInput.value,
                        age: ageInput.value,
                        birthDay: birthDayInput.value,
                      }),
                    ); //обновляем данные
                    dispatch(save()); //сохраняем = возвращаемся в режим просмотра
                  }}
                >
                  Сохранить
                </button>
              </div>
            ) : (
              // иначе будет этот блок - в режиме просмотра
              <div>
                <View value={firstName}>{inputName}</View>
                <View value={soName}>{inputSoname}</View>
                <View value={age}>{inputAge}</View>
                <View value={birthDay}>{inputBirthday}</View>
                <button
                  className={styles.btnEditSave}
                  onClick={() => {
                    dispatch(editData()); //Включаем редактирование
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
