import {createEffect, createEvent, createStore} from 'effector';

export const $userStore = createStore<{ userName: string, age: number, id: number } | null>(null);

export const getUserInfoFx = createEffect<unknown, { userName: string, age: number, id: number }>(async () => {
        await new Promise(rs => setTimeout(rs, 2000));
        return ({userName: 'Michael', age: 25, id: 1})
    }
)

export const setUserInfo = createEvent<{ userName: string, age: number, id: number }>('setUserInfo');

export const getUserInfoTrigger = createEvent('getUserInfoTrigger')

$userStore.on(setUserInfo, (state, payload) => payload);

getUserInfoFx.done.watch(({result}) => setUserInfo(result));

getUserInfoTrigger.watch(getUserInfoFx);

