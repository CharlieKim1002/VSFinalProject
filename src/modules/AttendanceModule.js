import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
export const POST_IN = 'attendance/POST_IN';
export const GET_IN_OUT = 'attendance/GET_IN_OUT';
export const POST_OUT = 'attendance/POST_OUT';
export const GET_MY = 'attendance/GET_MY';
export const GET_MANAGE_LIST = 'attendance/GET_MANAGE_LIST';

const actions = createActions({
    [POST_IN]: () => {},
    [GET_IN_OUT]: () => {},
    [POST_OUT]: () => {},
    [GET_MY]: () => {},
    [GET_MANAGE_LIST]: () => {}
});

/* 리듀서 */
const attendanceReducer = handleActions(
    {
        [POST_IN] : (state, { payload }) => {
            return payload;
        },
        [GET_IN_OUT] : (state, { payload }) => {
            return payload;
        },
        [POST_OUT] : (state, { payload }) => {
            return payload;
        },
        [GET_MY] : (state, { payload }) => {
            return payload;
        },
        [GET_MANAGE_LIST] : (state, { payload }) => {
            return payload;
        }
    },
    initialState
);

export default attendanceReducer;