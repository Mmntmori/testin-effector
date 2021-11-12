import React from 'react';
import {allSettled, fork} from "effector";
import {$userStore, getUserInfoFx, getUserInfoTrigger} from "./model";
import {act, render, waitFor, waitForElementToBeRemoved} from "@testing-library/react";
import {Provider} from "effector-react/ssr";
import App from "./App";

describe('Testing model', () => {
    test('Should get user info', async () => {
        // создаём фейковый обработчик для сайд-эффекта
        let fakeGetUserInfoFx = jest.fn(() => ({userName: 'Michael', age: 25, id: 1}))

        // создаём независимую копию всего приложения
        // чтобы один тест не мог повлиять на другой
        let scope = fork({
            handlers: new Map([
                [getUserInfoFx, fakeGetUserInfoFx]
            ])
        })

        // триггерим событие сбора данных о пользователе
        await allSettled(getUserInfoTrigger, {scope})

        // проверяем, что после всей цепочки вызовов в стор попало нужное нам значение
        expect(scope.getState($userStore)).toEqual({userName: 'Michael', age: 25, id: 1})
    })

    test('Should return null for get user info', async () => {
        // создаём фейковый обработчик для сайд-эффекта
        let fakeGetUserInfoFx = jest.fn()

        // создаём независимую копию всего приложения
        // чтобы один тест не мог повлиять на другой
        let scope = fork({
            handlers: new Map([
                [getUserInfoFx, fakeGetUserInfoFx]
            ])
        })

        // триггерим событие сбора данных о пользователе
        await allSettled(getUserInfoTrigger, {scope})

        // проверяем, что после всей цепочки вызовов в стор попало нужное нам значение
        expect(scope.getState($userStore)).toBeNull()
    })

    test('Should render correct UI', async () => {
        let fakeGetUserInfoFx = jest.fn(() => ({userName: 'Michael', age: 25, id: 1}))

        // создаём независимую копию всего приложения
        // чтобы один тест не мог повлиять на другой
        let scope = fork({
            handlers: new Map([
                [getUserInfoFx, fakeGetUserInfoFx]
            ])
        })

        const renderer = render(
            <Provider value={scope}>
                <App/>
            </Provider>
        );

        expect(renderer.getByTestId('test-app')).toHaveTextContent('Нет данных')

        // триггерим событие сбора данных о пользователе

        await waitFor(async () => {
            await allSettled(getUserInfoTrigger, {scope});
            expect(renderer.getByTestId('test-text')).toHaveTextContent(JSON.stringify(scope.getState($userStore)))
        })
    })
})
