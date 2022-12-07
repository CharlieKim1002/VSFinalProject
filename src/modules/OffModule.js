import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_OFFS = 'off/GET_OFFS';
export const GET_APP = 'off/GET_APP';
export const POST_OFF = 'off/POST_OFF';
export const GET_OFF_APP = 'off/GET_OFF_APP';
export const GET_OFF = 'off/GET_OFF';
export const PATCH_OFF_APP = 'off/PATCH_OFF_APP';
export const PATCH_OFF_RETURN = 'off/PATCH_OFF_RETURN';
export const PATCH_OFF = 'off/PATCH_OFF';
export const GET_CALENDAR_OFF = 'off/GET_CALENDAR_OFF';

const actions = createActions({
    [GET_OFFS]: () => {},
    [GET_APP]: () => {},
    [POST_OFF]: () => {},
    [GET_OFF_APP]: () => {},
    [GET_OFF]: () => {},
    [PATCH_OFF_APP]: () => {},
    [PATCH_OFF_RETURN]: () => {},
    [PATCH_OFF]: () => {},
    [GET_CALENDAR_OFF]: () => {}
});

/* 리듀서 */
const offReducer = handleActions(
    {
        [GET_OFFS] : (state, { payload }) => {
            return payload;
        },
        [GET_APP] : (state, { payload }) => {
            return payload;
        },
        [POST_OFF] : (state, { payload }) => {
            return payload;
        },
        [GET_OFF_APP] : (state, { payload }) => {
            return payload;
        },
        [GET_OFF] : (state, { payload }) => {
            return payload;
        },
        [PATCH_OFF_APP] : (state, { payload }) => {
            return payload;
        },
        [PATCH_OFF_RETURN] : (state, { payload }) => {
            return payload;
        },
        [PATCH_OFF] : (state, { payload }) => {
            return payload;
        },
        [GET_CALENDAR_OFF] : (state, { payload }) => {
            return payload;
        }
    },
    initialState
);

export default offReducer;