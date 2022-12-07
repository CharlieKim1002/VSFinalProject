import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_MY_CARD = 'card/GET_MY_CARD';
export const GET_MY_CARD_DETAIL = 'card/GET_MY_CARD_DETAIL';
export const PATCH_MY_CARD = 'card/PATCH_MY_CARD';
export const GET_CARDS = 'card/GET_CARDS';
export const GET_CUSTOMERS = 'card/GET_CUSTOMERS';
export const GET_CUSTOMER = 'card/GET_CUSTOMER';
export const POST_CUSTOMER = 'card/POST_CUSTOMER';
export const PATCH_CUSTOMER = 'card/PATCH_CUSTOMER';
export const DELETE_CUSTOMER = 'card/DELETE_CUSTOMER';

const actions = createActions({
    [GET_MY_CARD]: () => {},
    [GET_MY_CARD_DETAIL]: () => {},
    [PATCH_MY_CARD]: () => {},
    [GET_CARDS]: () => {},
    [GET_CUSTOMERS]: () => {},
    [GET_CUSTOMER]: () => {},
    [POST_CUSTOMER]: () => {},
    [PATCH_CUSTOMER]: () => {},
    [DELETE_CUSTOMER]: () => {}
});

/* 리듀서 */
const cardReducer = handleActions(
    {
        [GET_MY_CARD] : (state, { payload }) => {
            return payload;
        },
        [GET_MY_CARD_DETAIL] : (state, { payload }) => {
            return payload;
        },
        [PATCH_MY_CARD] : (state, { payload }) => {
            return payload;
        },
        [GET_CARDS] : (state, { payload }) => {
            return payload;
        },
        [GET_CUSTOMERS] : (state, { payload }) => {
            return payload;
        },
        [GET_CUSTOMER] : (state, { payload }) => {
            return payload;
        },
        [POST_CUSTOMER] : (state, { payload }) => {
            return payload;
        },
        [PATCH_CUSTOMER] : (state, { payload }) => {
            return payload;
        },
        [DELETE_CUSTOMER] : (state, { payload }) => {
            return payload;
        }
    },
    initialState
);

export default cardReducer;