import React, {useEffect} from 'react';
import './App.css';
import {$userStore, getUserInfoTrigger} from "./model";
import {useStore} from "effector-react";

function App() {
    const userInfo = useStore($userStore);
    useEffect(() => {
        if (!userInfo) {
            getUserInfoTrigger();
        }
    })

    console.log(userInfo)
    return (
        <div className="App">
            {userInfo ? JSON.stringify(userInfo) : "Нет данных"}
        </div>
    );
}

export default App;
