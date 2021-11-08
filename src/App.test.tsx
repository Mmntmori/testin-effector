import React from 'react';
import {allSettled, fork} from "effector";
import {$userStore, getUserInfoFx, getUserInfoTrigger} from "./model";

describe('Testing model', () => {
    test('Should get user info', async () => {
        // создаём фейковый обработчик для сайд-эффекта
        let fakeGetUserInfoFx = jest.fn()

        // создаём независимую копию всего приложения
        // чтобы один тест не мог повлиять на другой
        let scope = fork({
            handlers: [
                [getUserInfoFx, async () => null]
            ]
        })

        // триггерим событие сбора данных о пользователе
        await allSettled(getUserInfoTrigger, {scope})

        // проверяем, что после всей цепочки вызовов в стор попало нужное нам значение
        expect(scope.getState($userStore)).toEqual({userName: 'Michael', age: 25, id: 1})
    })
})
