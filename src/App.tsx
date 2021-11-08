import React from 'react';
import './App.css';
import {$userStore, getUserInfoTrigger} from "./model";
import {useEvent, useStore} from "effector-react";

function App() {
    const userInfo = useStore($userStore);
    const clickHandler = useEvent(getUserInfoTrigger)
    return (
        <div className="App" data-testid={'test-app'}>
            <p data-testid={'test-text'}>{userInfo ? JSON.stringify(userInfo) : "Нет данных"}</p>
            {userInfo ? null : <button type={'button'} data-testid={'get-button'} onClick={clickHandler}>Получить данные</button>}
        </div>
    );
}

export default App;
