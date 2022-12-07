import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_ROOM = 'room/GET_ROOM';
export const GET_ROOMS = 'room/GET_ROOMS';
export const POST_ROOM = 'room/POST_ROOM';
export const PUT_ROOM = 'room/PUT_ROOM';
// export const DELETE_ROOM = 'room/DELETE_ROOM';

const actions = createActions({
    [GET_ROOM]: () => {},
    [GET_ROOMS]: () => {},
    [POST_ROOM]: () => {},
    [PUT_ROOM]: () => {},
    // [DELETE_ROOM]: () => {}
});

/* 리듀서 */
const roomReducer = handleActions(
    {
        [GET_ROOM] : (state, { payload }) =>{
            return payload;
        },
        [GET_ROOMS] : (state, { payload }) =>{
            return payload;
        },
        [POST_ROOM] : (state, { payload }) =>{
            return payload;
        },
        [PUT_ROOM] : (state, { payload }) => {
            return payload;
        },
        // [DELETE_ROOM] : (state, { payload }) => {
        //     return payload;
        // }
    },
    initialState
);

export default roomReducer;